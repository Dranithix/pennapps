/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

let lastTopic = "";
Template.worksheet.viewmodel({
    topic: '',
    questions: null,
    createWorksheet() {
        if (this.topic() !== lastTopic) {
            console.log(this.topic());
            $("#worksheetButton").toggleClass("is-disabled", true).toggleClass("is-loading", true);
            Meteor.call('exam.mine', this.topic(), (err, res) => {
                let questions = [];
                let index = 1;
                _.each(res, (exams, i) => {
                    _.each(exams.q, (question) => {
                        question.question = (index++) + ". " + question.question;
                        question.choices = _.map(question.choices, (choice, x) => "(" + (x + 1) + ") " + choice)
                        question.tags = res[i].tags;
                        questions.push(question)
                    })
                })

                console.log(questions)
                this.questions(questions);
                $("#worksheetButton").toggleClass("is-disabled", false).toggleClass("is-loading", false);
            })
            lastTopic = this.topic();
        }
    }
})