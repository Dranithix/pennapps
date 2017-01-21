/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Template.question.viewmodel({
    onCreated() {
        console.log(FlowRouter.getParam("exam"));
        console.log(FlowRouter.getParam("question"));
    }
})