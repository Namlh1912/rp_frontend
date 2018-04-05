const Bluebird = require('bluebird-global');


class BrandRepository {

	constructor() {
		this._BrandModel = Bluebird.promisifyAll(Brand);
	}

	create(data) {
		return this._BrandModel.create(data);
	}

	getList() {
		return Brand.find()
			.then(res => {
				sails.log.info(res);
				return res;
			})
			.catch(err => {
				sails.log.error(err);
			});
	}

	getDetail(id) {
		return Brand.findOne({ id });
	}

	getByName(name) {
		return Brand.find({
			name: {
				'like': `%${name}%`
			}
		});
	}

	update(data) {
		return this._BrandModel.update({ id: data.id }, data);
	}

	async remove(brandId) {
		try {
			await Promise.all([Button.desrtoy(brandId), Product.destroy(brandId)]);
			return this._BrandModel.destroyAsync({ id: brandId });
		} catch (err) {
			sails.log.error(err);
			return null;
		}
	}

}

module.exports = BrandRepository;