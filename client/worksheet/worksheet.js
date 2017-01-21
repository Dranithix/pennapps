/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

let lastTopic = "";
Template.worksheet.viewmodel({
    topic: '',
    autorun() {
        if (this.topic() !== lastTopic) {
            lastTopic = this.topic();
        }
    },
})