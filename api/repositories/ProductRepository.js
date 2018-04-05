const Bluebird = require('bluebird-global');

const SORT_STRING = 'id DESC';
const PRODUCT_STATUS = {
	available: 'available',
	unavailable: 'unavailable'
}

class ProductRepository {
	constructor() {
		this._ProductModel = Bluebird.promisifyAll(Product);
	}

	create(data) {
		return Product.create(data);
	}

	getList() {
		return Product.find({status: {'!': PRODUCT_STATUS.unavailable}}).sort(SORT_STRING);
	}

	getDetail(id) {
		return Product.findOne({ id: id });
	}

	getByCategory(categoryId) {
		return Product.find({ categoryId });
	}

	remove(id) {
		return Product.destroy({ id: id });
	}

	update(index, data) {
		return Product.update(index, data);
	}

	searchName(name) {
		name = name.toLocaleLowerCase();
		return this._ProductModel.queryAsync(`
		set search_path = public, pg_catalog;
		select products.name, products.id, products.img_link as imgLink
		from products
		where lower(name) like  '%${name}%'
		`).then(res => res.rows);
	}
}

module.exports = ProductRepository;