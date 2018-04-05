const Bluebird = require('bluebird-global');

class OrderDetailRepository {
	constructor() {
		this._OrderDetailModel = Bluebird.promisifyAll(OrderDetail);
	}

	create(data) {
		return OrderDetail.create(data);
	}

	getByOrderId(orderId) {
		return this._OrderDetailModel.queryAsync(`
			set search_path = public, pg_catalog;
			select p.name, p.price, d.quantity, d.product_id as "productId", p.img_link as "imgLink", o.id as "orderId" 
			from order_details d
			left outer join products p on p.id = d.product_id
			left outer join orders o on o.id = d.order_id
			where d.order_id = ${orderId}
		`).then(res => res.rows);
	}

	removeByOrder(id) {
		return OrderDetail.destroy({ orderId: id });
	}

	removeByProduct(id) {
		return OrderDetail.destroy({ productId: id });
	}
}

module.exports = OrderDetailRepository;