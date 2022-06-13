const { Router } = require("express");
const FighterService = require("../services/fighterService");
const { responseMiddleware } = require("../middlewares/response.middleware");
const {
	createFighterValid,
	updateFighterValid,
} = require("../middlewares/fighter.validation.middleware");

const router = Router();

// TODO: Implement route controllers for fighter

router.get(
	"/",
	async (req, res, next) => {
		try {
			const users = await FighterService.findAll();
			res.data = users;
			next();
		} catch (err) {
			console.log(err);
			return res.status(400).json({ message: "Fighter not found" });
		}
	},
	responseMiddleware
);

router.get(
	"/:id",
	async (req, res, next) => {
		try {
			const fighter = await FighterService.search({ id: req.params.id });
			res.data = fighter;
			next();
		} catch (err) {
			console.log(err);
			return res.status(400).json({ message: "User id not found" });
		}
	},
	responseMiddleware
);

router.post(
	"/",
	createFighterValid,
	async (req, res, next) => {
		try {
			const fighter = await FighterService.create(req.body);
			res.data = fighter;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

module.exports = router;
