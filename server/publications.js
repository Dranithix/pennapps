/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Meteor.publish('exams.all', function() {
    return Exams.find({});
})

Meteor.publish('exams.view', function(id) {
    return Exams.find({_id: new Meteor.Collection.ObjectID(id)});
})

Meteor.publish('comments.view', function(exam, question) {
    return Comments.find({exam, question});
})

Meteor.publish('users', function() {
    return Meteor.users.find({});
})