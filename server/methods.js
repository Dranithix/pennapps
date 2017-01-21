/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import google from "google";
import textract from "textract";
import request from "request";

const excludedTerms = ['instructors'];

const search = (term) => {
    google.resultsPerPage = 10;
    let nextCounter = 0;
    let results = [];

    return new Promise((resolve, reject) => {
        google(term, function (err, res) {
            if (err) return reject(err);

            for (let i = 0; i < res.links.length; ++i) {
                const link = res.links[i].href;

                if (link.match(/pdf$/)) {
                    results.push(link);
                } else {
                    console.log(link);
                }

            }
            return resolve(results);
        });
    });
};

const nlp = (text) => {
    const body = {
        "apiKey": "DEMO",
        "extractors": ["entities", "topics"].join(","),
        "entityExtractionOptions[filterEntitiesToDBPediaTypes]": null,
        "entityExtractionOptions[filterEntitiesToFreebaseTypes]": null,
        "entityExtractionOptions[allowOverlap]": null,
        "text": text,
        "classifiers": "textrazor_iab"
    };

    const headers = {
        "Host": "www.textrazor.com",
        "Origin": "https://www.textrazor.com",
        "Referer": "https://www.textrazor.com/demo",
        "Content-Type": "application/x-www-form-urlencoded"
    };

    const options = {
        url: 'https://www.textrazor.com/demo/process/',
        headers: headers,
        method: 'POST',
        form: body
    };

    return new Promise((resolve, reject) => {
        const callback = (error, response, body) => {
            if (!error && response.statusCode == 200) {
                const info = JSON.parse(body);

                return resolve(info);
            } else {
                return reject(error);
            }
        };

        request('https://www.textrazor.com/demo/process/', options, callback);
    });
};

const extractText = (url) => {
    return new Promise((resolve, reject) => {
        textract.fromUrl(url, (error, text) => {
            if (error) return reject(error);

            return resolve(text);
        });
    });
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
        exam = _.filter(exam, exam => !/[@]*(SAMPLE)/g.test(exam) && exam.length > 150)

        _.each(exam, exam => {
            let question = exam.replace(/\d+[(.]\s*/g, '');

            let choices = [];
            if (question.match(/ [A-Ea-e\d][.)] .*/g)) {
                choices = _.map(_.filter(question.match(/ [A-Ea-e\d][.)] .*/g)[0].split(/ [A-Ea-e\d][.)]/g), text => text !== ""), text => text.trim());

                choices = _.filter(choices, choice => choice.length < 50);

                if (choices.length > 2 && choices.length < 5 && question.length < 1000) {
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

const filter = (obj) => {
    return new Promise((resolve, reject) => {
        let {url, category} = obj;
        extractText(url).then(text => {
            if (hasExcludedTerm(text)) {
                resolve(null);
            }

            nlp(text).then(nlp => {
                nlp.response.topics.filter(elem => {
                    return elem.label.includes('Exam') && elem.score === 1;
                });


                const questions = getQuestions(text);
                if (questions.length) {
                    resolve({
                        url,
                        category,
                        text,
                        tags: _.filter(nlp.response.topics, topic => topic.score === 1),
                        questions
                    });
                }
            }).catch(resolve);
        });
    })
};

Meteor.methods({
    'subjects': function () {
        const subjects = _.groupBy(Exams.find({}).fetch(), 'category');
        return Object.keys(subjects);
    },
    'exam.mine': function (term) {
        search(term + ' sample exam test questions site:.edu filetype:pdf')
            .then(urls => {
                urls = _.map(urls, url => {
                    return {url, category: term}
                });

                console.log(urls);
                // return Promise.all(urls.map(filter))
            })
    }

})