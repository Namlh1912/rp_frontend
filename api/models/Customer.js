module.exports = {
	tableName: 'customers',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		name: 'string',
		email: 'string'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}