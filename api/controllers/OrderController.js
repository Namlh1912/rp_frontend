const moment = require('moment');
const firebase = require("firebase-admin");
const serviceAccount = require('../../firebase/dash-button-be0d8-firebase-adminsdk-ta0bl-c8266986a4');
firebase.initializeApp({
	credential: firebase.credential.cert(serviceAccount),
	databaseURL: "https://dash-button-be0d8.firebaseio.com"
});

const OrderProvider = require('../providers/OrderProvider');
const ProductProvider = require('../providers/ProductProvider');
const ButtonProvider = require('../providers/CategoryProvider');
const OrderDetailProvider = require('../providers/OrderDetailProvider');
const UserProvider = require('../providers/UserProvider');
const CommonProvider = require('../providers/CommonService');
const ControllerBase = require('./ControllerBase');

// const TOPIC = 'notification';
const TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const MAIL_OPTION = {
	from: 'khoi.nguyen@firstidea.vn', // sender address
	to: '', // list of receivers
	subject: 'Order Confirmation', // Subject line
	html: ``
};
const ORDER_STATUS = {
	processing: 'processing',
	ordering: 'ordering',
	delivering: 'delivering',
	completed: 'completed',
	delivered: 'delivered'
}
// const SERVER = 'http://localhost:1337';

class OrderController extends ControllerBase {

	constructor() {
		super();
		this._exportedMethods = [
			'orderProduct',
			'getByUserId',
			'subcribeToOrderRoom'
		];
	}

	get buttonProvider() {
		if (!this._buttonProvider) {
			this._buttonProvider = new ButtonProvider();
		}
		return this._buttonProvider;
	}

	get orderProvider() {
		if (!this._provider) {
			this._provider = new OrderProvider();
		}
		return this._provider;
	}

	get orderDetailProvider() {
		if (!this._orderDetailProvider) {
			this._orderDetailProvider = new OrderDetailProvider();
		}
		return this._orderDetailProvider;
	}

	get productProvider() {
		if (!this._productProvider) {
			this._productProvider = new ProductProvider();
		}
		return this._productProvider;
	}

	get userProvider() {
		if (!this._userProvider) {
			this._userProvider = new UserProvider();
		}
		return this._userProvider;
	}

	get commonProvider() {
		if (!this._commonProvider) {
			this._commonProvider = new CommonProvider();
		}
		return this._commonProvider;
	}

	async create(request, response) {
		let products = request.body.products;
		let userId = request.param.accountId;
		let createdAt = this.getNow().format(TIME_FORMAT);
		let order = {
			userId,
			createdAt,
			status: ORDER_STATUS.processing
		};
		let [createdOrder, user] = await Promise.all([
			this.orderProvider.create(order),
			this.userProvider.detail(userId)
		]);
		let detailProm = [];
		products.forEach(product => {
			let detail = {
				orderId: createdOrder.id,
				productId: parseInt(product.id, 10),
				quantity: parseInt(product.quantity, 10)
			};
			detailProm.push(this.orderDetailProvider.create(detail));
		});
		Promise.all(detailProm).then(() => {
			let payload = {
				data: {
					title: 'Order Confirmation',
					message: `Your order had been processed`,
					orderId: `${createdOrder.id}`
				},
				token: user.appToken
			};
			sails.log.info('id + apptoken', `${user.id} + ${user.appToken}`);
			firebase.messaging().send(payload);
			let transport = this.commonProvider.configTransport();
			let mail = Object.assign({}, MAIL_OPTION);
			mail.to = user.email;
			mail.html = `
				<div style="text-align: center; margin: 0 15% 0 15%; border: 1px solid grey">
					<div style="background-color: red; color: white; font-weight: bold; font-size: x-large">
						<b>ORDER CONFIRMATION</b>
					</div>
					<br/>
					<p>Your order has been put on progressing.</p>
				</div>
					
				`;
			this.commonProvider.sendmail(transport, mail);
			sails.sockets.broadcast('orderRoom', 'orderCreated', {
				order: createdOrder
			});
			return response.ok(createdOrder);
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Cannot create this order');
		});

	}

	delete(request, response) {
		let id = parseInt(request.param('id'), 10);

		this.orderDetailProvider.getByGroupId(id)
			.then(devices => {
				if (devices.length) {
					return {
						message: 'The following group are used by other devices',
						groups: devices
					};
				}
				return this.orderProvider.delete(id);
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
				return response.serverError('Cannot delete this group');
			});
	}


	async detail(request, response) {
		try {
			let id = parseInt(request.param('id'), 10);
			let [products, order] = await Promise.all([
				this.orderDetailProvider.getByOrderId(id),
				this.orderProvider.detail(id)
			]);
			if (order) {
				let newProducts = products.map(product => {
					delete product.orderId;
					let quantity = product.quantity;
					delete product.quantity;
					return { product, quantity }
				});

				order.productOrders = newProducts;
				return response.ok(order);
			}
			return response.notFound('Cannot find this order detail');
		}
		catch (err) {
			sails.log.error(err);
			return response.serverError('Cannot find this order detail');
		}
	}

	getNow() {
		return moment().utc();
	}

	list(request, response) {
		let column = request.param('column');
		let method = request.param('method');
		let orders = [];
		this.orderProvider.list(column, method)
			.then(res => {
				let orderProm = [];
				orders = res;
				res.forEach(order => {
					order.productOrders = [];
					orderProm.push(this.orderDetailProvider.getByOrderId(order.id));
				});
				return Promise.all(orderProm);
			})
			.then(products => {
				products.forEach(productArr => {
					let [product] = productArr;
					let index = product && orders.findIndex(el => el.id === product.orderId);
					if (index >= 0) {
						productArr.forEach(el => {
							delete el.orderId;
							let quantity = el.quantity;
							delete el.quantity;
							orders[index].productOrders.push({ product: el, quantity })
						});
					}
				});
				return response.ok(orders);
			})
			.catch(err => {
				response.serverError('Get groups failed');
				sails.log.error(err);
			});
	}

	async getByUserId(request, response) {
		try {
			let userId = request.param('id');
			let [user, orders] = await Promise.all([
				this.userProvider.detail(userId)
				, this.orderProvider.getByUserId(userId)
			]);
			if (orders && orders.length) {
				let orderProm = [];
				orders.forEach(order => {
					order.productOrders = [];
					order.username = user.name;
					order.address = user.address;
					orderProm.push(this.orderDetailProvider.getByOrderId(order.id));
				});
				let products = await Promise.all(orderProm);
				products.forEach(productArr => {
					let [product] = productArr;
					let index = product && orders.findIndex(el => el.id === product.orderId);
					if (index >= 0) {
						productArr.forEach(el => {
							delete el.orderId;
							let quantity = el.quantity;
							delete el.quantity;
							orders[index].productOrders.push({ product: el, quantity })
						});
					}
				});
				return response.ok(orders);
			}
			return response.notFound('Cannot find any orders');
		}
		catch (err) {
			sails.log.error(err);
			return response.serverError('Cannot find any orders');
		}
	}

	orderProduct(request, response) {
		let deviceCode = request.param('device_code');
		this.buttonProvider.getByDeviceCode(deviceCode).then(device => {
			let [detail] = device;
			sails.log.info('id + apptoken', `${detail.userId} + ${detail.appToken}`);
			let payload = {
				data: {
					title: 'Order Confirmation',
					message: `You just order ${detail.productname}`,
					deviceId: `${detail.id}`,
					productId: `${detail.productId}`
				},
				token: detail.appToken
			};
			return firebase.messaging().send(payload);
		}).then(res => {
			sails.log.info('firebase message success', res);
			response.status(204);
			return response.send();
		}).catch(err => {
			sails.log.error(err);
			return response.serverError('Cannot send this message');
		});
	}

	subcribeToOrderRoom(request, response) {
		if (request.isSocket) {
			sails.sockets.join(request, 'orderRoom');
			return response.json({
				room: 'join succeed'
			});
		}
		return response.json({
			socket: false
		});
	}
}

module.exports = new OrderController().exports();