const Blurebird = require('bluebird-global');


class CustomerRepository {
	constructor() {
		this._CustomerModel = Blurebird.promisifyAll(Customer);
	}

	create(data) {
		return Customer.create(data);
	}

	getList() {
		return this._CustomerModel.queryAsync(`
			set search_path = photobooth, pg_catalog;
			select t.*, count(d.Customer_id) as "assetCount"
			from Customers t 
			left outer join Customerdetail d on t.id = d.Customer_id 
			group by t.id, d.Customer_id
			order by t.id desc
		`).then(Customers => Customers.rows);
	}

	getDetail(id) {
		return Customer.findOne({ id: id });
	}

	searchName(fieldID, tableDetail, condition, name) {

		return this._CustomerModel.queryAsync(`
			set search_path = photobooth, pg_catalog;
			select id as "CustomerId", name from Customers
			where id not in (select ${fieldID} from ${tableDetail} where ${condition} )
			and lower(name) like '%${name.toLowerCase()}%'
			order by id desc
		`).then(res => res.rows);
	}

	update(data) {
		return Customer.update({ id: data.id }, {
			name: data.name,
			updatedAt: data.updatedAt
		});
	}

	remove(id) {
		return Customer.destroyAsync({ id: id });
	}

	searchNameByGroup(groupId, name) {
		return this._CustomerModel.queryAsync(`
			set search_path = photobooth, pg_catalog;
			select t.id as "CustomerId", t.name 
			from Customers t
			where t.id not in (
				select g.Customer_id from devicegroups g, Customers 
				where Customers.id = g.Customer_id and g.id = ${groupId}
			)
			and t.name like '%${name}%'
			order by t.id desc
		`).then(res => res.rows);
	}
}

module.exports = CustomerRepository;