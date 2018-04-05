const nodemailer = require('nodemailer');

class CommonServices {
	constructor() {

	}

	sendmail(transporter, mailOpts) {
		return new Promise((resolve, reject) => {
			transporter.sendMail(mailOpts, (error, info) => {
				if (error) {
					sails.log.info(error);
					return reject(error);
				}
				sails.log.info('Message sent: %s', info.messageId);
				return resolve();
			});
		});
	}

	configTransport() {
		let transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'ng.kimkhoi.first@gmail.com',
				pass: 'dautiendo'
			}
		});
		return transporter;
	}
}

module.exports = CommonServices;