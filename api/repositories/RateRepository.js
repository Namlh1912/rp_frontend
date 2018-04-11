const Bluebird = require('bluebird-global');

class RateRepository {

	constructor() {
		this._RateModel = Bluebird.promisifyAll(Rate);
	}

	create(data) {
		return Rate.create(data);
	}

	getList() {
		return Rate.find();
	}

	getDetail(id) {
		return Rate.findOne({
			id
		});
	}

	async getRateReport(pageIndex) {
		const skip = 30 * (pageIndex - 1);
		try {
			const res = await this._RateModel.queryAsync(`
				select r.rating, r.feedback, c.*, p.name as product from rates r
				left outer join customers c on r.customerId = c.id
				left outer join products p on r.productId = p.id
				limit 30 offset ${skip} order by r.id
			`, []);
			return res;
		} catch (err) {
			sails.log.error(err);
		}
	}

	remove(id) {
		return this._RateModel.destroyAsync({
			id: id
		});
	}

	update(data) {
		return Rate.update({
			id: data.id
		}, data);
	}
}

module.exports = RateRepository;
