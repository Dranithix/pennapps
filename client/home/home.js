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
                    labels: ["# Reached", "Votes Casted"],
                    datasets: [
                        {
                            label: "Percentage",
                            data: [65, 35],
                            backgroundColor: ["#6FE0B8"],
                            hoverBackgroundColor: ["#50C692"]
                        }
                    ]
                },

            }
        )
    },

    autorun() {
        if (this.parent().subject()) {
            const exams = Exams.find({categories: {$in: [this.parent().subject()]}}).fetch();
            console.log(exams)

            if (exams.length) {
                let questions = [];
                _.each(exams, (exam, i) => questions = questions.concat(_.map(exam.questions, (question, index) => {
                    question.url = exam.url;
                    question.choices = _.map(question.choices, (choice, index) => choice = "(" + (index + 1) + ") " + choice);
                    question.exam = exam._id;
                    question.tags = exam.tags;
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
            if (questions[i].question == q.question) {
                index = i;
                break;
            }
        }

        console.log(index)

        let update = {};
        update[`questions.${index}.votes`] = Meteor.userId();

        if (index != -1) {
            const query = questions[index];

            if (query) {
                if (_.find(query.votes, person => person === Meteor.userId())) {
                    Exams.update({_id: q.exam}, {$pull: update});
                } else {
                    Exams.update({_id: q.exam}, {$push: update});

                }
            }
        }
    },

    votedUpClass(obj) {
      return _.contains(obj.votes, Meteor.userId());
    },

    voteDown() {
        console.log('DOWN');
    },

    gotoQuestion(question) {
        let index = -1, questions = Exams.findOne({_id: question.exam}).questions;
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question == question.question) {
                index = i;
                break;
            }
        }
        FlowRouter.go(`/question/${question.exam}/${index}`);
    }
});