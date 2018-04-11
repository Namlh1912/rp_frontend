const Bluebird = require('bluebird-global');


class SurveyRepository {

	constructor() {
		this._SurveyModel = Bluebird.promisifyAll(Survey);
	}

	create(data) {
		return this._SurveyModel.create(data);
	}

	getList() {
		return Survey.find({sort: 'id DESC'})
			.then(res => {
				return res;
			})
			.catch(err => {
				sails.log.error(err);
			});
	}

	getDetail(id) {
		return Survey.findOne({ id });
	}

	getByName(name) {
		return Survey.find({
			name: {
				'like': `%${name}%`
			}
		});
	}

	update(data) {
		return this._SurveyModel.update({ id: data.id }, data);
	}

	async remove(SurveyId) {
		try {
			// await Promise.all([Button.desrtoy(SurveyId), Product.destroy(SurveyId)]);
			return this._SurveyModel.destroyAsync({ id: SurveyId });
		} catch (err) {
			sails.log.error(err);
			return null;
		}
	}

}

module.exports = SurveyRepository;