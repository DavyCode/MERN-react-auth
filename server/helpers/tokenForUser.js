const 
    jwt = require('jwt-simple'),
    config = require('../../config');

module.exports = function () {
	return {
		async tokenForUser (user) {
			const timestamp = new Date().getTime();
			const token = await jwt.encode({ sub: user.id, iat: timestamp }, config.jwtSecret);

			return token;
		}
	}
}

