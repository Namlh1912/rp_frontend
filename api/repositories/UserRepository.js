const Bluebird = require('bluebird-global');


class DeviceRepository {

	constructor() {
		this._UserModel = Bluebird.promisifyAll(User);
	}

	create(data) {
		return this._UserModel.create(data);
	}

	checkUsername(username) {
		return User.findOne({ username });
	}

	getList() {
		return User.find();
	}

	getDetail(id) {
		return User.findOne({ id });
	}

	login(user) {
		return User.findOne({ username: user.username, password: user.password });
	}

	update(data) {
		return User.update({ id: data.id }, data);
	}

	remove(id) {
		return this._UserModel.destroyAsync({ id: id });
	}
}

module.exports = DeviceRepository;