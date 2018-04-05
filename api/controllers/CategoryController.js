const moment = require('moment');
// const Bluebird = require('bluebird-global');

const CategoryProvider = require('../providers/CategoryProvider');
const ProductProvider = require('../providers/ProductProvider');
const ControllerBase = require('./ControllerBase');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class CategoryController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [

		]
	}

	get categoryProvider() {
		if (!this._provider) {
			this._provider = new CategoryProvider();
		}
		return this._provider;
	}

	get productProvider() {
		if (!this._productProvider) {
			this._productProvider = new ProductProvider();
		}
		return this._productProvider;
	}

	create(request, response) {
		const category = request.body;
		this.categoryProvider.create(category)
			.then(res => {
				return response.ok(res);
			})
			.catch(err => {
				sails.log.error(err);
				response.serverError('Cannot create this category');
			});
	}

	delete(request, response) {
		let id = parseInt(request.param('id'), 10);
		this.categoryProvider.delete(id).then(res => {
			response.ok(res);
		}).catch(err => {
			sails.log.error(err);
			response.serverError('Cannot delete this category');
		});
	}

	async detail(request, response) {
		let id = parseInt(request.param('id'), 10);
		try {
			const [detail, products] = await Promise.all([this.categoryProvider.detail(id), this.productProvider.getByCategory(id)]);
			detail.products = products;
			response.ok(detail);
		} catch(err) {
			response.serverError(`Get category id ${id} failed`);
			sails.log.error(err);
		}
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		this.categoryProvider.list()
			.then(res => response.ok(res))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Get categories failed');
			});
	}

	update(request, response) {
		let body = request.body;
		this.categoryProvider.update(body).then(res => {
			if (res) {
				return response.ok(res);
			}
			return response.notFound('Cannot find this button');
		}).catch(err => {
			response.serverError(`Update devices failed`);
			sails.log.error(err);
		});
	}
}

module.exports = new CategoryController().exports();
