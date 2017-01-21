/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import annotator from "annotator";
import Chart from "chartjs";

Template.home.viewmodel({
    questions: [],
    onCreated() {
        Meteor.subscribe('exams.all');

        let app = new annotator.App();
        app.include(annotator.ui.main);
        app.include(annotator.storage.http);
        app.start();
    },

    onRendered() {
        const progressChart = new Chart(
            $("#progressChart"),
            {
                type: 'pie',
                data: {
                    labels: ["Progress"],
                    datasets: [

                        {
                            label: "Percentage",
                            data: [100],
                            backgroundColor: ["#FF6384"],
                            hoverBackgroundColor: ["#FF6384"]
                        }
                    ]
                },

            }
        )
    },

    autorun() {
        const exams = Exams.find({}).fetch();

        let questions = [];
        _.each(exams, exam => {
            let firstCount = exam.text.match(/ [A-Z\d]\. /g);
            let secondCount = exam.text.match(/ \([A-Z\d]\) /g);
            firstCount = firstCount && firstCount.length || 0;
            secondCount = secondCount && secondCount.length || 0;

            if (firstCount > secondCount) {
                exam = exam.text.match(/\b(\d{1,2})\.\s\D*(?:(?!\b\d{1,3}\.\s)\d+\D*)*/g);
                exam = _.filter(exam, exam => !/[@]*(SAMPLE)/g.test(exam) && exam.length > 150)

                _.each(exam, exam => {
                    let question = exam.replace(/\d+[(.]\s*/g, '');

                    let choices = [];
                    if (question.match(/\b[A-Z][.)].*/g)) choices = _.map(_.filter(question.match(/\b[A-Z][.)].*/g)[0].split(/[A-Z\d][.)] /g), text => text !== ""), text => text.trim());
                    choices = _.filter(choices, choice => choice.length < 50);

                    if (choices.length > 1 && choices.length < 5) {
                        questions.push({
                            question: question.replace(/\b[A-Z][.)].*/g, ''),
                            choices
                        })
                    }
                });
            }
        })

        console.log(questions)
        this.questions(questions);
    }
})