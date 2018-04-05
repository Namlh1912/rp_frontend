const passport = require('passport');

module.exports = (req, res, next) => {
	let authenticate = (request, response, next) => {
		return new Promise((resolve, reject) => {
			passport.authenticate('jwt', (error, payload, info, status) => {
				if (error) {
					return reject(error);
				}
				resolve({ payload, info, status });
			})(request, response, next);
		});
	};

	authenticate(req, res, next).then(authResult => {
		if (!authResult || !authResult.payload) {
			return res.json(401, { message: authResult.info.message, name: authResult.info.name });
		}
	
		req.param['userId'] = authResult.payload.userId;

		return next();
	});
}