const moment = require('moment');

const CustomerRepository = require('../repositories/CustomerRepository');
const RateRepository = require('../repositories/RateRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class RateProvider {

	constructor() {

	}

	get customerRepo() {
		if (!this._cusRepo) {
			this._cusRepo = new CustomerRepository();
		}
		return this._cusRepo;
	}

	get rateRepo() {
		if (!this._rateRepo) {
			this._rateRepo = new RateRepository();
		}
		return this._rateRepo;
	}

	create(data) {
		return this.rateRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => sails.log.error(err));
	}

	delete(id) {
		return this.rateRepo.remove(id).then((group) => {
			return group;
		}).catch(err => {
			sails.log.error(err);
		});
	}

	detail(id) {
		return this.customerRepo.getDetail(id);
	}

	deleteThemeId(groupId) {
		return this.customerRepo.deleteThemeId(groupId);
	}

	getByUserId(id) {
		return this.customerRepo.getByUserId(id);
	}

	list(column, method) {
		return this.customerRepo.getList(column, method);
	}

	searchNameByTheme(themeId, name) {
		return this.customerRepo.searchName(themeId, name);
	}

	update(data) {
		data.updatedAt = moment().utc().format(TIME_FORMAT);

		return this.customerRepo.update(data).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
		});
	}

	updateThemeId(groupId, themeId) {
		return this.customerRepo.updateThemeId(groupId, themeId);
	}
}

module.exports = RateProvider;