const moment = require('moment');

const OrderRepository = require('../repositories/OrderRepository');
const ButtonRepository = require('../repositories/ButtonRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class OrderProvider {

	constructor() {

	}

	get orderRepo() {
		if (!this._repo) {
			this._repo = new OrderRepository();
		}
		return this._repo;
	}

	get buttonRepo() {
		if (!this._buttonRepo) {
			this._buttonRepo = new ButtonRepository();
		}
		return this._buttonRepo;
	}

	create(data) {
		return this.orderRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => sails.log.error(err));
	}

	delete(id) {
		return this.orderRepo.remove(id).then((group) => {
			return group;
		}).catch(err => {
			sails.log.error(err);
		});
	}

	detail(id) {
		return this.orderRepo.getDetail(id);
	}

	deleteThemeId(groupId) {
		return this.orderRepo.deleteThemeId(groupId);
	}

	getByUserId(id) {
		return this.orderRepo.getByUserId(id);
	}

	list(column, method) {
		return this.orderRepo.getList(column, method);
	}

	searchNameByTheme(themeId, name) {
		return this.orderRepo.searchName(themeId, name);
	}

	update(data) {
		data.updatedAt = moment().utc().format(TIME_FORMAT);

		return this.orderRepo.update(data).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
		});
	}

	updateThemeId(groupId, themeId) {
		return this.orderRepo.updateThemeId(groupId, themeId);
	}
}

module.exports = OrderProvider;