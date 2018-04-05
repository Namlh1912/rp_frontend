/**
 * Image.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
	tableName: 'products',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: 'string',
		imgLink: 'string',
		description: 'string',
		categoryId: 'integer'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
};

