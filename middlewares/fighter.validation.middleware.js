const { fighter } = require("../models/fighter");

const createFighterValid = (req, res, next) => {
	// TODO: Implement validatior for fighter entity during creation

	const { id, ...otherFighter } = fighter;

	let data =
		Object.keys(req.body).length !== Object.keys(otherFighter).length
			? Object.assign({}, otherFighter, req.body)
			: req.body;

	const errorsMessage = checkValidationFighter(data);

	if (errorsMessage.length !== 0) {
		// res.status(400) = true;
		// res.message = errorsMessage;
		res.status = 400;
		res.send(errorsMessage);
	}

	next();
};

const updateFighterValid = (req, res, next) => {
	// TODO: Implement validatior for fighter entity during update
	next();
};

const checkPower = (power) => {
	if (power < 1 || power > 100) {
		return false;
	}
	return power;
};

const checkDefense = (defense) => {
	if (defense < 1 || defense > 10) {
		return false;
	}
	return defense;
};

const checkHealth = (health) => {
	if (!health) {
		health = 100;
		return health;
	}
	if (health > 120 || health < 80) {
		return false;
	}
	return health;
};

const checkValidationFighter = (newFighter) => {
	let error = "";

	Object.keys(newFighter).forEach((e) => {
		switch (e) {
			case "power": {
				if (!checkPower(newFighter[e])) {
					error += `You must select from 1 to 100  \n`;
				}
				break;
			}

			case "defense": {
				if (!checkDefense(newFighter[e])) {
					error = `You must select from 1 to 10  \n`;
				}
				break;
			}

			case "health": {
				if (!checkHealth(newFighter[e])) {
					error = `You must select from 80 to 120  \n`;
				}
				break;
			}

			default:
		}
	});

	return error;
};

exports.createFighterValid = createFighterValid;
exports.updateFighterValid = updateFighterValid;
