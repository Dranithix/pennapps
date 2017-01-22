import {Meteor} from "meteor/meteor";

Accounts.onCreateUser(function (options, user) {
    if (user.profile == undefined) user.profile = {};
    _.extend(user.profile, {firstName: options.firstName, lastName: options.lastName, dob: options.dob});
    return user;
});

Meteor.startup(() => {
    // code to run on server at startup
});
