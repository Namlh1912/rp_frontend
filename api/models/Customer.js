module.exports = {
	tableName: 'customers',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: 'string',
		email: 'string',
		phone: 'string',
		city: 'string',
		company: 'string',
		business: 'string',
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}