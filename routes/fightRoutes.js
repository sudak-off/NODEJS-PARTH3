const { Router } = require("express");
const FightService = require("../services/fightService");
const {
	createUserValid,
	updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// OPTIONAL TODO: Implement route controller for fights

router.get(
	"/",
	async (req, res, next) => {
		try {
			const fightsList = await FightService.getAll();
			res.data = fightsList;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.get(
	"/:id",
	async (req, res, next) => {
		try {
			const fightLog = await FightService.getLogById(req.params.id);
			res.data = fightLog;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.post(
	"/",
	async (req, res, next) => {
		try {
			const logs = await FightService.writeLog(req.body);
			res.data = logs;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.delete(
	"/:id",
	async (req, res, next) => {
		try {
			const deletedLog = await FightService.delete(req.params.id);
			res.data = deletedLog;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

module.exports = router;
