/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Template.question.viewmodel({
  exam: null, question: null,
  autorun() {
    Meteor.subscribe('exams.view', FlowRouter.getParam("exam"));
    this.exam(Exams.findOne({_id: new Meteor.Collection.ObjectID(FlowRouter.getParam("exam"))}));


    if (this.exam()) {
      this.question(this.exam().questions[parseInt(FlowRouter.getParam("question"))])
      this.question().choices = _.map(this.question().choices, (choice, index) => "(" + (index  + 1) + ") " + choice)
      this.question().exam = this.exam()._id;
    }
  },

  numVotes(question) {
    return question.votes && question.votes.length || 0;
  },

  voteUp(q) {
    const index = parseInt(FlowRouter.getParam("question"));

    let update = {};
    update[`questions.${index}.votes`] = Meteor.userId();

    if (_.find(this.question().votes, person => person===Meteor.userId())) {
      console.log("TEST")
      Exams.update({_id: q.exam}, {$pull: update});
    } else {
      Exams.update({_id: q.exam}, {$push: update});
    }
  },

  voteDown() {
    console.log('DOWN');
  }
})