/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */

Meteor.methods({
    'subjects': function () {
        const subjects = _.groupBy(Exams.find({}).fetch(), 'category');
        return Object.keys(subjects);
    }

})