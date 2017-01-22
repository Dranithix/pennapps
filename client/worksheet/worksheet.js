/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import jsPDF from "jspdf";
import swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

let lastTopic = "";
Template.worksheet.viewmodel({
    topic: '',
    questions: null,
    topicSelected: false,
    autorun() {
        const topic = FlowRouter.getParam("topic");
        this.topic(topic);
        if (topic) {
            this.topicSelected(true);
            this.createWorksheet();
        } else {
            this.topicSelected(false);
        }
    },
    createWorksheet() {
        if (this.topic() !== lastTopic) {
            $("#worksheetButton").toggleClass("is-disabled", true).toggleClass("is-loading", true);
            Meteor.call('exam.mine', this.topic(), (err, res) => {
                let questions = [];
                let index = 1;
                _.each(res, (exam, i) => {
                    _.each(exam.questions, (question) => {
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
    },
    exportPDF() {
        var pdf = new jsPDF('p', 'pt', 'a4');
        pdf.internal.scaleFactor = 2.5;

        const element = $(".questions")[0];
        var w = element.clientWidth;
        var h = element.clientHeight;
        var newCanvas = document.createElement('canvas');
        newCanvas.width = w * 2;
        newCanvas.height = h * 2;
        newCanvas.style.width = w + 'px';
        newCanvas.style.height = h + 'px';
        var context = newCanvas.getContext('2d');
        context.scale(2, 2);

        var options = {
            pagesplit: true,
            retina: true
        };

        $.getScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js", () => {
            pdf.addHTML(element, {pagesplit: true, canvas: newCanvas}, function () {
                pdf.save('two-by-four.pdf')
            });
        })
    },
    shareWorksheet() {
        swal({
            title: 'Send to student?',
            showCancelButton: true,
            confirmButtonText: 'Submit',
            showLoaderOnConfirm: true,
            preConfirm: function (email) {
                return new Promise(function (resolve, reject) {
                    setTimeout(function () {
                        resolve()
                    }, 2000)
                })
            },
            allowOutsideClick: false
        }).then(function (email) {
            swal({
                type: 'success',
                title: 'Sent to student!',
                html: 'Worksheet has been sent.'
            })
        })
    }
})