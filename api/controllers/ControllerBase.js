class ControllerBase {
	constructor() {
		this._exportedMethods = [];
	}

	exports() {
		// Merge default array and custom array from child.
		var methods = ControllerBase._defaultExportedMethods.concat(this._exportedMethods);
		var exportedMethods = {};

		for(let methodName of methods) {
			let method = this[methodName];
			// Check if the method exists.
			if(typeof method == null) { continue; }

			if(_.isFunction(method)) {
				exportedMethods[methodName] = method.bind(this);
			} else {
				exportedMethods[methodName] = method
			}
		}

		return exportedMethods;
	}
}

ControllerBase._defaultExportedMethods = [
	// Sails controller custom config.
	'_config',

	// Default predefined controller methods.
	'create',
	'delete',
	'list',
	'detail',
	'patch',
	'update'
];

module.exports = ControllerBase;