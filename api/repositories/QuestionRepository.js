const Bluebird = require('bluebird-global');

class QuestionRepository {

	constructor() {
		this._QuestionModel = Bluebird.promisifyAll(Question);
	}

	create(data) {
		return Question.create(data);
	}

	getList() {
		return Question.find();
	}

	getDetail(id) {
		return Question.findOne({
			id
		});
	}

	async getBySurvey(id) {
		try {
			const res = await this._QuestionModel.queryAsync(`
				select q.*, t.type from questions q
				left outer join question_types t on q.questionType = t.id
				where q.surveyId = ${id}
			`, []);
			return res;
		} catch (err) {
			sails.log.error(err);
		}
	}

	remove(id) {
		return this._QuestionModel.destroyAsync({
			id: id
		});
	}

	update(data) {
		return Question.update({
			id: data.id
		}, data);
	}
}

module.exports = QuestionRepository;
