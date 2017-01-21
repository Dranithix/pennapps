/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Meteor.publish('exams.all', function() {
    return Exams.find({});
})

Meteor.publish('exams.view', function(id) {
    console.log(Exams.find({_id: new Meteor.Collection.ObjectID(id)}).count())
    return Exams.find({_id: new Meteor.Collection.ObjectID(id)});
})