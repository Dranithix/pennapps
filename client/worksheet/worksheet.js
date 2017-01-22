/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

let lastTopic = "";
Template.worksheet.viewmodel({
    topic: '',
    questions: null,
    createWorksheet() {
        if (this.topic() !== lastTopic) {
            console.log(this.topic());
            $("#worksheetButton").toggleClass("is-disabled", true).toggleClass("is-loading", true);
            Meteor.call('exam.mine', this.topic(), (err, res) => {
                console.log(res);
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

        // html2canvas($(".questions")[0], {
        //     onrendered: function(canvas) {
        //         var imgData = canvas.toDataURL(
        //             'image/png');
        //         var doc = new jsPDF('p', 'mm');
        //         doc.addImage(imgData, 'PNG', 0, 0, canvas.width / 8, canvas.height / 8);
        //         doc.save('sample-file.pdf');
        //     }
        // });
    }
})