module.exports = {
	tableName: 'questions',
	attributes: {
		id: {
			type: 'integer',
			primaryKey: true
		},
		description: 'string',
		questionType: 'integer',
		surveyId: 'integer',
		answer: 'string'
	},
	autoCreatedAt: false,
	autoUpdatedAt: false,
}
