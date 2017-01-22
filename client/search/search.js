/**
 * Created by Kenta Iwasaki on 1/22/2017.
 */
Template.search.viewmodel({
    questions: null,
    onCreated() {
        Meteor.subscribe('exams.all');

        const query = FlowRouter.getParam("query");
        Meteor.call('question.search', query, (err, res) => {
            if (!err) {
                let questions = [];
                let index = 1;
                _.each(res, (exam, i) => {
                    _.each(exam.questions, (question) => {
                        question.choices = _.map(question.choices, (choice, x) => "(" + (x + 1) + ") " + choice)
                        question.tags = res[i].tags;
                        question.exam = exam._id;
                        questions.push(question)
                    })
                })

                this.questions(questions);
            }
        })
    },
    onRendered() {

    },
    numVotes(question) {
        return question.votes && question.votes.length || 0;
    },

    gotoQuestion(question) {
        let index = -1, questions = Exams.findOne({_id: question.exam}).questions;
        console.log(question);
        console.log(questions)
        for (let i = 0; i < questions.length; i++) {
            if (questions[i].question === question.question) {
                index = i;
                break;
            }
        }
        FlowRouter.go(`/question/${question.exam}/${index}`);
    }
})