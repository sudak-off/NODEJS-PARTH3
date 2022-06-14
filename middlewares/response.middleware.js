const responseMiddleware = (req, res, next) => {
	// TODO: Implement middleware that returns result of the query
	if (res.err) {
		res.status(400).json({
			error: true,
			message: res.err.message,
		});
	}
	res.status(200).json(res.data);
	next();
};

exports.responseMiddleware = responseMiddleware;
