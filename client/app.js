/**
 * Created by Kenta Iwasaki on 1/6/2017.
 */

Template.app.viewmodel({
    logout() {
        Meteor.logout(err => {
            if (!err) FlowRouter.redirect("/")
        })
    }
})