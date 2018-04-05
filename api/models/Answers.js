module.exports = {
	tableName: 'customers',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		answer: 'string',
		questionId: 'string'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}