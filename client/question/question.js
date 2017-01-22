/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Template.question.viewmodel({
  exam: null, question: null, comments: null,
  autorun() {
    Meteor.subscribe('exams.view', FlowRouter.getParam("exam"));
    Meteor.subscribe('comments.view', FlowRouter.getParam("exam"), FlowRouter.getParam("question"));

    this.exam(Exams.findOne({_id: new Meteor.Collection.ObjectID(FlowRouter.getParam("exam"))}));

    if (this.exam()) {
      this.question(this.exam().questions[parseInt(FlowRouter.getParam("question"))])
      this.question().choices = _.map(this.question().choices, (choice, index) => "(" + (index  + 1) + ") " + choice)
      this.question().exam = this.exam()._id;
    }

    this.comments(Comments.find({}).fetch());
  },

  numVotes(obj) {
    return obj.votes && obj.votes.length || 0;
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

  },

  commentVoteDown(c) {

  },

  voteDown() {
    console.log('DOWN');
  },

  createComment() {
    const text = document.getElementById('comment-input').value;

    Comments.insert({ text, exam: FlowRouter.getParam("exam"), question: FlowRouter.getParam("question"), created_at: new Date() }, (err, _id) => {
      if (err) console.log(err);
      document.getElementById('comment-input').value = '';
      console.log('success!! ', _id);
    });

  }
});