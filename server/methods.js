/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import "../shared/collections"

Meteor.methods({
  'question.view': function (e, qid) {
    const obj = Exams.findOne(new Meteor.Collection.ObjectID(e));
    return {exam: obj, question: obj.questions[qid]};
  },
  'subjects': function () {
    const subjects = _.groupBy(Exams.find({}).fetch(), 'category');
    return Object.keys(subjects);
  },

})