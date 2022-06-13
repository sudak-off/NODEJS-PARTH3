const { Router } = require("express");
const UserService = require("../services/userService");
const {
	createUserValid,
	updateUserValid,
} = require("../middlewares/user.validation.middleware");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

// TODO: Implement route controllers for user

router.get(
	"/",
	async (req, res, next) => {
		try {
			const users = await UserService.findAll();
			res.data = users;
			next();
		} catch (err) {
			console.log(err);
			return res.status(400).json({ message: "Users not found" });
		}
	},
	responseMiddleware
);

router.get(
	"/:id",
	async (req, res, next) => {
		try {
			const users = await UserService.search({ id: req.params.id });
			res.data = users;
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
	createUserValid,
	async (req, res, next) => {
		try {
			const users = await UserService.create(req.body);
			res.data = users;
			next();
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

router.put(
	"/:id",
	updateUserValid,
	async (req, res, next) => {
		const { email, password, firstName, lastName, phoneNumber } = req.body;
		try {
			const updatedUser = await UserService.update(req.params.id, {
				email,
				password,
				firstName,
				lastName,
				phoneNumber,
			});
			res.data = updatedUser;
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
			const deletedUser = await UserService.delete(req.params.id);
			res.data = deletedUser;
		} catch (error) {
			res.err = error;
		} finally {
			next();
		}
	},
	responseMiddleware
);

module.exports = router;
