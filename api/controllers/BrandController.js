const moment = require('moment');

const BrandProvider = require('../providers/BrandProvider');
const ProductProvider = require('../providers/ProductProvider');
const ControllerBase = require('./ControllerBase');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class BrandController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'searchByName'
		]
	}

	get brandProvider() {
		if (!this._provider) {
			this._provider = new BrandProvider();
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
		let body = request.body;
		this.brandProvider.create(body)
			.then(res => response.ok(res))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Cannot create this brand');
			});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);

		this.brandProvider.detail(id)
			.then(detail => {
				response.ok(detail);
			})
			.catch(err => {
				response.serverError(`Get brand id ${id} failed`);
				sails.log.error(err);
			});
	}

	delete(request, response) {
		let id = parseInt(request.param('id'));

		this.groupProvider.getGroupByTheme(id)
			.then(groups => {
				if (groups.length) {
					return {
						message: 'The following theme are used by other groups',
						themes: groups
					};
				}
				return this.brandProvider.delete(id);
			})
			.then(deleted => {
				if (Array.isArray(deleted)) {
					response.ok({ data: deleted });
				} else {
					response.forbidden(deleted);
				}
			})
			.catch(err => {
				sails.log.error(err);
				return response.serverError('Cannot remove this theme');
			});
	}

	getNow() {
		return moment().utc();
	}

	async list(request, response) {
		let list = await this.brandProvider.list();
		if (list && list.length) {
			let brandProm = [];
			list.forEach(brand => {
				brand.products = [];
				brandProm.push(this.productProvider.getByCategory(brand.id));
			});
			let brandProducts = await Promise.all(brandProm);
			brandProducts.forEach(products => {
				if(products.length) {
					let index = list.findIndex(el => el.id == products[0].brandId);
					list[index].products = products;
				}
			});
			return response.ok(list);
		}
		return response.serverError('Get brands list failed');
	}

	searchByName(request, response) {
		let name = request.param('name');
		if (name) {
			this.brandProvider.getByName(name).then(res => {
				if (res.length) {
					return response.ok(res );
				} else {
					return response.notFound({ message: 'No matches' });
				}
			}).catch(err => {
				sails.log.error(new Error(err));
				response.serverError({ message: 'No matches.' })
			});
		}
	}


	update(request, response) {
		// let body = request.body;
		// let assets = body['assets'];
		// let groups = body['groups'];
		// let detailAssets = [],
		// 	detailGroups = [];

		// body.theme['updatedAt'] = moment().format(TIME_FORMAT);
		// let theme = body.theme;

		// if (assets && assets.length || groups && groups.length) {
		// 	assets.forEach(el => {
		// 		el.theme_id = body.theme['id'];
		// 		detailAssets.push(this.themeDetailProvider.checkExistDetail(el));
		// 	});

		// 	groups.forEach(group => {
		// 		group.theme_id = body.theme['id'];
		// 		detailGroups.push(this.groupProvider.updateThemeId(group.groupId, group.theme_id));
		// 	});

		// 	Promise.all(detailAssets).then(() => {
		// 		this.updateTheme(theme, response);
		// 	}).catch(err => {
		// 		sails.log.error(err);
		// 		response.serverError('Update theme failed');
		// 	});
		// } else {
		// 	this.updateTheme(theme, response);
		// }

	}
}

module.exports = new BrandController().exports();