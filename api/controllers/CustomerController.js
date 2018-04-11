const moment = require('moment');

const CustomerProvider = require('../providers/CustomerProvider');
const ControllerBase = require('./ControllerBase');

const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';


class CustomerController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			
		]
	}

	get customerProvider() {
		if (!this._provider) {
			this._provider = new CustomerProvider();
		}
		return this._provider;
	}

	create(request, response) {
		let body = request.body;
		this.customerProvider.create(body)
			.then(res => response.ok({ data: res }))
			.catch(err => {
				sails.log.error(err);
				response.serverError('Cannot create this theme');
			});
	}

	detail(request, response) {
		let id = parseInt(request.param('id'), 10);

		Promise.all([
			this.customerProvider.detail(id),
			this.themeDetailProvider.getByThemeId(id),
			this.groupProvider.getGroupByTheme(id)
		])
		.then(([detail, assets, groups]) => {
			detail.assets = assets;
			detail.groups = groups;
			response.ok({ data: detail });
		})
		.catch(err => {
			response.serverError(`Get theme id ${id} failed`);
			sails.log.error(err);
		});
	}

	async delete(request, response) {
		let id = parseInt(request.param('id'));
		const deleted = await this._provider.delete(id);
		return response.ok({data: true});
	}	

	getNow(){
		return moment().utc();
	}

	async list(request, response) {
		let list = await this.customerProvider.list();
		if(list && list.length) {
			return response.ok({data: list});
		}
		return response.serverError('Get themes list failed');
	}

	async update(request, response) {
		let customer = request.body;
		let updated = await this._provider.update(customer);
		return response.ok({data: updated});
	}
}

module.exports = new CustomerController().exports();