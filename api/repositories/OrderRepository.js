const Bluebird = require('bluebird-global');


class OrderRepository {

	constructor() {
		this._OrderModel = Bluebird.promisifyAll(Order);
	}

	create(data) {
		return Order.create(data);
	}

	deleteThemeId(groupId) {
		return this._OrderModel.update({ id: groupId }, { theme_id: null }).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
		});
	}

	getList(column, method) {
		return this._OrderModel.queryAsync(`
			set search_path = public, pg_catalog;
			select o.id, o.user_id as "userId", o.created_at as "createdAt", o.status, 
			u.name as username, u.address
			from orders o 
			left outer join users u on u.id = o.user_id
			order by ${column} ${method}
		`).then(res => res.rows);
	}

	getDetail(id) {
		return this._OrderModel.queryAsync(`
			set search_path = public, pg_catalog;
			select orders.id, orders.user_id as "userId", orders.created_at as "createdAt", users.name as username, users.address, orders.status
			from orders 
			left outer join users on users.id = orders.user_id
			where orders.id = ${id}
		`).then(res => {
			let [result] = res.rows;
			return result;
		});
	}

	getByUserId(id) {
		return this._OrderModel.queryAsync(`
			set search_path = public, pg_catalog;
			select o.id, o.user_id as "userId", o.created_at as "createdAt"
			from orders o
			left outer join order_details d on o.id = d.order_id
			left outer join users u on u.id = o.user_id
			left outer join products p on p.id = d.product_id
			where user_id = ${id} group by o.id
		`).then(res => res.rows);
	}

	remove(id) {
		return this._OrderModel.destroyAsync({ id: id });
	}

	update(data) {
		return Order.update({ id: data.id }, data);
	}

	updateThemeId(groupId, themeId) {
		return this._OrderModel.update({ id: groupId }, { theme_id: themeId }).then(res => {
			return res[0];
		}).catch(err => {
			sails.log.error(err);
		});
	}
}

module.exports = OrderRepository;