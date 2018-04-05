// const Bluebird = require('bluebird-global');
const CustomerRepository = require('../repositories/CustomerRepository');

class CustomerProvider {

	constructor() {

	}

	get customerRepo() {
		if (!this._repo) {
			this._repo = new CustomerRepository();
		}
		return this._repo;
	}

	list() {
		return this.customerRepo.getList();
	}

	create(data) {
		return this.customerRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => {
				sails.log.error(err);
				return err;
			});
	}

	detail(id) {
		return this.customerRepo.getDetail(id);
	}

	delete(id) {
		return this.customerRepo.remove(id);
	}

	update(data) {
		return this.customerRepo.update(data).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}
}

module.exports = CustomerProvider;
