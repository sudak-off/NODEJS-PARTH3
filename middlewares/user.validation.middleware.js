const { user } = require("../models/user");

const createUserValid = async (req, res, next) => {
	// TODO: Implement validatior for user entity during creation

	let { id, ...aboutUser } = user;

	let data =
		Object.keys(req.body).length !== Object.keys(aboutUser).length
			? Object.assign({}, aboutUser, req.body)
			: req.body;

	const errorsMessage = checkValidation(data);

	if (errorsMessage.length !== 0) {
		// res.status(400) = true;
		// res.message = errorsMessage;
		res.status = 400;
		res.send(errorsMessage);
	}
	next();
};

const updateUserValid = (req, res, next) => {
	// TODO: Implement validatior for user entity during update
	const errorsMessage = checkValidation({ ...req.body });

	if (errorsMessage.length !== 0) {
		res.status = 400;
		res.send(errorsMessage);
	}

	next();
};

const checkToGmail = (gmail) => {
	return gmail && gmail.match(/[a-zA-Z0-9]+(@gmail.com$)/);
};

const checkMobilePhone = (phoneNumber) => {
	return phoneNumber && phoneNumber.match(/\+380[0-9]{9}$/);
};

const checkLengthPassword = (password) => {
	return password && password.length >= 3;
};

const checkValidation = (newUser) => {
	let error = "";

	Object.keys(newUser).forEach((e) => {
		switch (e) {
			case "email": {
				if (!checkToGmail(newUser[e])) {
					error += `Need correction Gmail   \n`;
				}
				break;
			}

			case "password": {
				if (!checkLengthPassword(newUser[e])) {
					error += `Incorrect password, minimum 3 characters. \n`;
				}
				break;
			}

			case "phoneNumber": {
				if (!checkMobilePhone(newUser[e])) {
					error += `Incorrect mobile phone \n`;
				}
				break;
			}

			default:
		}
	});

	return error;
};

exports.createUserValid = createUserValid;
exports.updateUserValid = updateUserValid;
