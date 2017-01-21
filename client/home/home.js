/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import Chart from "chart.js";

Template.home.viewmodel({
  questions: [],
  onCreated() {
    Meteor.subscribe('exams.all');

    // let app = new annotator.App();
    // app.include(annotator.ui.main);
    // app.include(annotator.storage.http);
    // app.start();
  },

  onRendered() {
    const progressChart = new Chart(
      $("#progressChart"),
      {
        type: 'pie',
        data: {
          labels: ["Progress", "Todo"],
          datasets: [
            {
              label: "Percentage",
              data: [65, 35],
              backgroundColor: ["#FF6384"],
              hoverBackgroundColor: ["#FF6384"]
            }
          ]
        },

      }
    )
  },

  autorun() {
    if (this.parent().subject()) {
      const exams = Exams.find({category: this.parent().subject()}).fetch();

      if (exams.length) {
        let questions = [];
        _.each(exams, exam => questions = questions.concat(_.map(exam.questions, (question, index) => {
          question.rawQuestion = question.question;
          question.question = (index + 1) + ". " + question.question;
          question.url = exam.url;
          question.choices = _.map(question.choices, (choice, index) => choice = "(" + (index + 1) + ") " + choice);
          question.exam = exam._id;

          return question;
        })));
        this.questions(questions);
      } else {
        this.questions([]);
      }
    }
  },

  numVotes(question) {
    return question.votes && question.votes.length || 0;
  },

  voteUp(q) {
    let index = -1, questions = Exams.findOne({_id: q.exam}).questions;
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].question==q.rawQuestion) {
        index = i;
        break;
      }
    }

    let update = {};
    update[`questions.${index}.votes`] = Meteor.userId();

    if (index!= -1) {
      const query = questions[index];

      if (query) {
        if (_.find(query.votes, person => person===Meteor.userId())) {
          Exams.update({_id: q.exam}, {$pull: update});
        } else {
          Exams.update({_id: q.exam}, {$push: update});
        }
      }
    }
  },

  voteDown() {
    console.log('DOWN');
  }
});