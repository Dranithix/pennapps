/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import moment from "moment";

Template.question.viewmodel({
    exam: null, question: null, comments: null,
    onCreated() {
        Meteor.subscribe('users');
    },
    autorun() {
        Meteor.subscribe('exams.view', FlowRouter.getParam("exam"));
        Meteor.subscribe('comments.view', FlowRouter.getParam("exam"), FlowRouter.getParam("question"));

        console.log(FlowRouter.getParam("exam"))

        this.exam(Exams.findOne({_id: FlowRouter.getParam("exam")}));

        if (this.exam()) {
            this.question(this.exam().questions[parseInt(FlowRouter.getParam("question"))])
            this.question().choices = _.map(this.question().choices, (choice, index) => "(" + (index + 1) + ") " + choice)
            this.question().exam = this.exam()._id;
        }

        this.comments(Comments.find({}).fetch());
    },

    numVotes(obj) {
        console.log(obj)
        return obj.votes && obj.votes.length || 0;
    },
    numAnswers() {
        return Comments.find({}).count();
    },

    votedUpClass(obj) {
        return _.contains(obj.votes, Meteor.userId());
    },

    voteUp(q) {
        const index = parseInt(FlowRouter.getParam("question"));

        let update = {};
        update[`questions.${index}.votes`] = Meteor.userId();

        if (_.find(this.question().votes, person => person === Meteor.userId())) {
            Exams.update({_id: q.exam}, {$pull: update});
        } else {
            Exams.update({_id: q.exam}, {$push: update});
        }
    },

    commentVoteUp(c) {
        const index = parseInt(FlowRouter.getParam("question"));

        let update = {};
        update[`votes`] = Meteor.userId();

        if (_.find(c.votes, person => person === Meteor.userId())) {
            Comments.update({_id: c._id}, {$pull: update});
        } else {
            Comments.update({_id: c._id}, {$push: update});
        }
    },

    commentVoteDown(c) {

    },

    formattedTime(date) {
        return moment(date).from(TimeSync.serverTime());
    },

    commentAuthor(userId) {
        const user = Meteor.users.findOne({_id: userId});
        return user.profile.firstName + " " + user.profile.lastName;
    },

    voteDown() {
        console.log('DOWN');
    },

    createComment() {
        const text = document.getElementById('comment-input').value;

        Comments.insert({
            text,
            author: Meteor.userId(),
            exam: FlowRouter.getParam("exam"),
            question: FlowRouter.getParam("question"),
            votes: []
        }, (err, _id) => {
            if (err) console.log(err);
            document.getElementById('comment-input').value = '';
            console.log('success!! ', _id);
        });

    }
});