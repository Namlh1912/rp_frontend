// const Bluebird = require('bluebird-global');
const moment = require('moment');

const BrandRepository = require('../repositories/BrandRepository');
const ProductRepository = require('../repositories/ProductRepository');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class BrandProvider {

	constructor() {

	}

	get brandRepo() {
		if (!this._repo) {
			this._repo = new BrandRepository();
		}
		return this._repo;
	}
	
	get productRepo() {
		if (!this._productRepo) {
			this._productRepo = new ProductRepository();
		}
		return this._productRepo;
	}

	list() {
		return this.brandRepo.getList();
	}

	create(data) {
		return this.brandRepo.create(data)
			.then(res => {
				return res;
			}).catch(err => {
				sails.log.error(err);
				return err;
			});
	}

	async detail(id) {
		let brand = await this.brandRepo.getDetail(id);
		brand.products = await this.productRepo.getByBrand(brand.id);
		return brand;
	}

	delete(id) {
		return this.themeDetailRepo.removeByTheme(id).then(() => {
			return this.brandRepo.remove(id);
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}

	getByName(name){
		return this.brandRepo.getByName(name);
	}

	update(data) {
		data.updatedAt = moment().format(TIME_FORMAT);

		return this.brandRepo.update(data).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
			return err;
		});
	}
}

module.exports = BrandProvider;