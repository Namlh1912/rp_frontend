// const Bluebird = require('bluebird-global');
const moment = require('moment');

const SurveyRepository = require('../repositories/SurveyRepository');
const QuestionRepository = require('../repositories/QuestionRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class SurveyProvider {

	constructor() {

	}

	get surveyRepo() {
		if (!this._repo) {
			this._repo = new SurveyRepository();
		}
		return this._repo;
	}

	get questionRepo() {
		if (!this._questionRepo) {
			this._questionRepo = new QuestionRepository();
		}
		return this._questionRepo;
	}

	list() {
		return this.surveyRepo.getList();
	}

	async create(data) {
		try {
			const questionsData = data.questions;
			let survey = await this.surveyRepo.create(data);
			let questionProm = [];
			questionsData.forEach(async el => {
				el.surveyId = survey.id;
				questionProm.push(this.questionRepo.create(el));
			});
			await Promise.all(questionProm);
			return survey;
		} catch(err) {
			sails.log.error(err);
		}

		// await Promise.all(answerProm);

			// .then(res => {
			// 	return res;
			// }).catch(err => {
			// 	sails.log.error(err);
			// 	return err;
			// });
	}

	async detail(id) {
		try {
			let [survey, questions] = await Promise.all([this.surveyRepo.getDetail(id), this.questionRepo.getBySurvey(id)]);
			// let survey = await this.surveyRepo.getDetail(id);
			// sails.log.info(survey);
			// let questions = await this.questionRepo.getBySurvey(id);
			// sails.log.info(questions);
			questions.forEach(el => {
				let answers = el.answer && el.answer.split('#@#');
				el.answer = [];
				answers && answers.forEach(ans => el.answer.push({title: ans}));
			});
			survey.questions = questions;
			return survey;
		} catch (err) {
			sails.log.error(err);
		}
	}

	delete(id) {
		return this.themeDetailRepo.removeByTheme(id).then(() => {
			return this.surveyRepo.remove(id);
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}

	getByName(name) {
		return this.surveyRepo.getByName(name);
	}

	update(data) {
		data.updatedAt = moment().format(TIME_FORMAT);

		return this.surveyRepo.update(data).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}
}

module.exports = SurveyProvider;
