const passport = require('passport');
const passportJwt = require('passport-jwt');
const jwtStrategy = passportJwt.Strategy;
const extractJwt = passportJwt.ExtractJwt;

const SECRET = '123456abc';
const ISSUER = 'http://localhost:1337';
const opts = {
	algorithms: ['HS256'],
	secretOrKey: SECRET,
	jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
	issuer: ISSUER,
};

let strategy = new jwtStrategy(opts, (payload, done) => {
	// TODO: 1. Validate payload object
	// Optional: Log timestamp for statistics purpose
	done(null, payload);
});

passport.use('jwt', strategy);