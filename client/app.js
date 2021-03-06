/**
 * Created by Kenta Iwasaki on 1/6/2017.
 */

Template.app.viewmodel({
    subject: null,
    subjects: [],
    searchQuery: "",
    onCreated() {
        const self = this;
        Meteor.call('subjects', (err, res) => {
            this.subjects(res);
            this.subject("Technology & Computing");
        })
    },
    logout() {
        Meteor.logout(err => {
            if (!err) FlowRouter.redirect("/")
        })
    }
})