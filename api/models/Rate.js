/**
 * Device.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'rates',
	attributes: {
		productId: 'integer',
		customerId: 'integer',
		rating: 'float',
		feedback: 'string'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
};

