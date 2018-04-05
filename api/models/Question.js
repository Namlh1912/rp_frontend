module.exports = {
	tableName: 'questions',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		description: 'string',
		questionType: 'integer',
		surveyId: 'integer'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}