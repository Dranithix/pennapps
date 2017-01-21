/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Meteor.publish('exams.all', function() {
    return Exams.find({});
})