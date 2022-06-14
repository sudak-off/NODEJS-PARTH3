const { Router } = require("express");
const AuthService = require("../services/authService");
const { responseMiddleware } = require("../middlewares/response.middleware");

const router = Router();

router.post(
	"/login",
	async (req, res, next) => {
		try {
			// TODO: Implement login action (get the user if it exist with entered credentials)
			const { email, password } = req.body;
			const data = await AuthService.login({ email, password });
			res.data = data;
		} catch (err) {
			res.err = err;
		} finally {
			next();
		}
	},
	responseMiddleware
);

module.exports = router;
