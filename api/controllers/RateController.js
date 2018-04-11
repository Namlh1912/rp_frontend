const moment = require('moment');
const firebase = require("firebase-admin");
const serviceAccount = require('../../firebase/dash-button-be0d8-firebase-adminsdk-ta0bl-c8266986a4');
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://dash-button-be0d8.firebaseio.com"
});

const ProductProvider = require('../providers/ProductProvider');
const CustomerProvider = require('../providers/CustomerProvider');
const RateProvider = require('../providers/rateProvider');
const ControllerBase = require('./ControllerBase');

// const SERVER = 'http://localhost:1337';

class OrderController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
		];
	}

	get productProvider() {
		if (!this._productProvider) {
			this._productProvider = new ProductProvider();
		}
		return this._productProvider;
	}

	get rateProvider() {
		if (!this._rateProvider) {
			this._rateProvider = new RateProvider();
		}
		return this._rateProvider;
	}

	get customerProvider() {
		if (!this._customerProvider) {
			this._customerProvider = new CustomerProvider();
		}
		return this._customerProvider;
	}

	async create(request, response) {
		const customer = request.body['customer'];
		const rates = request.body['rates'];
		try {
			const cus = await this.customerProvider.create(customer);
			let rateProm = [];
			rates.forEach(el => {
				el.customerId = cus.id;
				rateProm.push(this.rateProvider.create(el));
			});
			await Promise.all(rateProm);
			response.status(204);
			return response.send();
		} catch (err) {
			return response.serverError('Cannot create rate.');
		}
	}

	delete(request, response) {

	}


	async detail(request, response) {
		// try {
		// 	let id = parseInt(request.param('id'), 10);
		// 	let [products, order] = await Promise.all([
		// 		this.orderDetailProvider.getByOrderId(id),
		// 		this.orderProvider.detail(id)
		// 	]);
		// 	if (order) {
		// 		let newProducts = products.map(product => {
		// 			delete product.orderId;
		// 			let quantity = product.quantity;
		// 			delete product.quantity;
		// 			return { product, quantity }
		// 		});

		// 		order.productOrders = newProducts;
		// 		return response.ok(order);
		// 	}
		// 	return response.notFound('Cannot find this order detail');
		// }
		// catch (err) {
		// 	sails.log.error(err);
		// 	return response.serverError('Cannot find this order detail');
		// }
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		// let column = request.param('column');
		// let method = request.param('method');
		// let orders = [];
		// this.orderProvider.list(column, method)
		// 	.then(res => {
		// 		let orderProm = [];
		// 		orders = res;
		// 		res.forEach(order => {
		// 			order.productOrders = [];
		// 			orderProm.push(this.orderDetailProvider.getByOrderId(order.id));
		// 		});
		// 		return Promise.all(orderProm);
		// 	})
		// 	.then(products => {
		// 		products.forEach(productArr => {
		// 			let [product] = productArr;
		// 			let index = product && orders.findIndex(el => el.id === product.orderId);
		// 			if (index >= 0) {
		// 				productArr.forEach(el => {
		// 					delete el.orderId;
		// 					let quantity = el.quantity;
		// 					delete el.quantity;
		// 					orders[index].productOrders.push({ product: el, quantity })
		// 				});
		// 			}
		// 		});
		// 		return response.ok(orders);
		// 	})
		// 	.catch(err => {
		// 		response.serverError('Get groups failed');
		// 		sails.log.error(err);
		// 	});
	}

	async getByrateId(request, response) {
		// try {
		// 	let rateId = request.param('id');
		// 	let [rate, orders] = await Promise.all([
		// 		this.rateProvider.detail(rateId)
		// 		, this.orderProvider.getByrateId(rateId)
		// 	]);
		// 	if (orders && orders.length) {
		// 		let orderProm = [];
		// 		orders.forEach(order => {
		// 			order.productOrders = [];
		// 			order.ratename = rate.name;
		// 			order.address = rate.address;
		// 			orderProm.push(this.orderDetailProvider.getByOrderId(order.id));
		// 		});
		// 		let products = await Promise.all(orderProm);
		// 		products.forEach(productArr => {
		// 			let [product] = productArr;
		// 			let index = product && orders.findIndex(el => el.id === product.orderId);
		// 			if (index >= 0) {
		// 				productArr.forEach(el => {
		// 					delete el.orderId;
		// 					let quantity = el.quantity;
		// 					delete el.quantity;
		// 					orders[index].productOrders.push({ product: el, quantity })
		// 				});
		// 			}
		// 		});
		// 		return response.ok(orders);
		// 	}
		// 	return response.notFound('Cannot find any orders');
		// }
		// catch (err) {
		// 	sails.log.error(err);
		// 	return response.serverError('Cannot find any orders');
		// }
	}

	orderProduct(request, response) {
		// let deviceCode = request.param('device_code');
		// this.buttonProvider.getByDeviceCode(deviceCode).then(device => {
		// 	let [detail] = device;
		// 	sails.log.info('id + apptoken', `${detail.rateId} + ${detail.appToken}`);
		// 	let payload = {
		// 		data: {
		// 			title: 'Order Confirmation',
		// 			message: `You just order ${detail.productname}`,
		// 			deviceId: `${detail.id}`,
		// 			productId: `${detail.productId}`
		// 		},
		// 		token: detail.appToken
		// 	};
		// 	return firebase.messaging().send(payload);
		// }).then(res => {
		// 	sails.log.info('firebase message success', res);
		// 	response.status(204);
		// 	return response.send();
		// }).catch(err => {
		// 	sails.log.error(err);
		// 	return response.serverError('Cannot send this message');
		// });
	}

	subcribeToOrderRoom(request, response) {
		// if (request.isSocket) {
		// 	sails.sockets.join(request, 'orderRoom');
		// 	return response.json({
		// 		room: 'join succeed'
		// 	});
		// }
		// return response.json({
		// 	socket: false
		// });
	}
}

module.exports = new OrderController().exports();