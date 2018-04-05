module.exports = {
	"env": {
		"browser": true,
		"node": true,
		"es6": true
	},
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 8
	},
	"globals": {
		"sails": true,
		"Feedback": true,
		"Survey": true,
		"Rate": true,
		"Question": true,
		"QuestionType": true,
		"SurveyDetail": true,
		"Customer": true,
		"Answer": true,
		"User": true,
		"Product": true,
		"Category": true,
		"_": true
	},
	"rules": {
		"no-unused-vars": "warn",
		"no-console": "warn"
	}
};