import google from "google";
import textract from "textract";

const excludedTerms = ['instructors'];

const search = (term) => {
    google.resultsPerPage = 5;
    let nextCounter = 0;
    let results = [];

    const googleSync = Meteor.wrapAsync(google)
    const res = googleSync(term);
    for (let i = 0; i < res.links.length; ++i) {
        const link = res.links[i].href;

        if (link.match(/pdf$/)) {
            results.push(link);
        }

    }
    return results.slice(0, 5);
};

const hasExcludedTerm = (text) => {
    const lowerCaseText = text.toLowerCase();

    for (let i = 0; i < excludedTerms.length; i++) {
        const term = excludedTerms[i];

        if (lowerCaseText.includes(term)) {
            return true;
        }
    }

    return false;
};

const getQuestions = (text) => {
    let questions = [];
    let firstCount = text.match(/ [A-Z\d]\. /g);
    let secondCount = text.match(/ \([A-Z\d]\) /g);
    firstCount = firstCount && firstCount.length || 0;
    secondCount = secondCount && secondCount.length || 0;

    if (firstCount > secondCount) {
        let exam = text.match(/\b(\d{1,2})\.\s\D*(?:(?!\b\d{1,3}\.\s)\d+\D*)*/g);
        exam = _.filter(exam, exam => exam.length > 150)

        _.each(exam, exam => {
            let question = exam.replace(/\d+[(.]\s*/g, '');

            let choices = [];
            if (question.match(/ [A-Ea-e\d][.)] .*/g)) {
                choices = _.map(_.filter(question.match(/ [A-Ea-e\d][.)] .*/g)[0].split(/ [A-Ea-e\d][.)]/g), text => text !== ""), text => text.trim());

                choices = _.filter(choices, choice => choice.length < 50);

                if (choices.length > 2 && choices.length < 5 && question.length < 1000 && question.charAt(0) == question.charAt(0).toUpperCase()) {
                    questions.push({
                        question: question.replace(/ [A-Ea-e\d][.)] .*/g, ''),
                        choices
                    });
                }
            }
        });
    }
    return questions
};

Meteor.methods({
    'subjects': function () {
        const subjects = _.flatten(_.pluck(Exams.find({}).fetch(), 'categories'));
        return _.sortBy(_.uniq(subjects), val => val);
    },
    'question.view': function (e, qid) {
        const obj = Exams.findOne(new Meteor.Collection.ObjectID(e));
        return {exam: obj, question: obj.questions[qid]};
    },
    'exam.mine': function (term) {
        const extractPDF = Meteor.wrapAsync(textract.fromUrl);
        let searchResults = search(term + ' sample exam test multiple choice questions site:.edu filetype:pdf');

        let exams = [];
        _.each(searchResults, url => {
            try {
                let exam = null;
                if (exam = Exams.findOne({url})) {
                    exams = exams.concat(exam);
                } else {
                    const text = extractPDF(url);

                    const nlpResponse = HTTP.post("https://www.textrazor.com/demo/process/", {
                        headers: {
                            Host: "www.textrazor.com",
                            Origin: "https://www.textrazor.com",
                            Referer: "https://www.textrazor.com/demo",
                            "Content-Type": "application/x-www-form-urlencoded"
                        },
                        params: {
                            apiKey: "DEMO",
                            extractors: ["entities", "topics"].join(","),
                            "entityExtractionOptions[filterEntitiesToDBPediaTypes]": "null",
                            "entityExtractionOptions[filterEntitiesToFreebaseTypes]": "null",
                            "entityExtractionOptions[allowOverlap]": "null",
                            text,
                            classifiers: "textrazor_iab"
                        }
                    });
                    const nlp = nlpResponse && nlpResponse.data && nlpResponse.data.response;
                    if (nlp && nlp.topics) {
                        nlp.topics = _.filter(nlp.topics, elem => {
                            return elem.score === 1;
                        });
                        const categories = _.map(_.filter(nlp.categories, category => category.score >= 0.5), category => category.label.replace(">", " > "));

                        const q = getQuestions(text);
                        if (q.length) {
                            const data = {
                                url,
                                categories,
                                text,
                                tags: _.filter(nlp.topics, topic => topic.score === 1).slice(0, 5),
                                questions: q
                            };

                            Exams.insert(data);
                            exams.push(data);
                        }
                    }
                }
            } catch (ex) {

            }

        });
        return exams;
    }
});