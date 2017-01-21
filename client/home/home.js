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
                _.each(exams, exam => questions = questions.concat(_.map(exam.questions, question => {
                    question.url = exam.url;
                    question.choices = _.map(question.choices, (choice, index) => choice = (index + 1) + ") " + choice);

                    return question;
                })));
                this.questions(questions);
            } else {
                this.questions([]);
            }
        }
    },

    voteUp() {
        console.log("UP")
    },

    voteDown() {
        console.log('DOWN');
    }
});