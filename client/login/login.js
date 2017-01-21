/**
 * Created by Kenta Iwasaki on 1/4/2017.
 */

import "flatpickr";
import "flatpickr/dist/flatpickr.css";

Template.login.viewmodel({
    email: '',
    password: '',
    error: '',
    login: function (event) {
        Meteor.loginWithPassword(this.email(), this.password(), err => {
            if (err) this.error(err.reason)
            else FlowRouter.redirect('/home');
        })
    }
});

Template.register.viewmodel({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dob: '1998-01-01',
    error: '',
    onRendered() {
        $(".date").flatpickr({
            maxDate: "2006-01-01",
        });
    },
    register: function (event) {
        if (this.password() !== this.confirmPassword()) {
            this.error("Passwords do not match.");
            return;
        }

        const firstName = this.firstName().split(' ').map((s) => (s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())).join(' ');
        const lastName = this.lastName().split(' ').map((s) => (s.slice(0, 1).toUpperCase() + s.slice(1).toLowerCase())).join(' ');

        Accounts.createUser({
            email: this.email(),
            password: this.password(),
            firstName,
            lastName,
            dob: this.dob()
        }, err => {
            if (err) this.error(err);
            else FlowRouter.redirect("/home");
        })
    }
})