// const moment = require('moment');
const OrderDetailRepository = require('../repositories/OrderDetailRepository');

class OrderDetailProvider {
	constructor() {

	}

	get orderDetailRepo() {
		if (!this._themeDetail) {
			this._themeDetail = new OrderDetailRepository()
		}
		return this._themeDetail;
	}

	create(detail) {
		return this.orderDetailRepo.create(detail);
	}

	getByOrderId(orderId){
		return this.orderDetailRepo.getByOrderId(orderId);
	}

	remove(id) {
		return this.orderDetailRepo.remove(id).then(res => res)
			.catch(err => {
				sails.log.error(err);
				return err;
			});
	}

}

module.exports = OrderDetailProvider;