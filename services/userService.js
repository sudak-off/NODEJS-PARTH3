const { UserRepository } = require("../repositories/userRepository");

class UserService {
	// TODO: Implement methods to work with user

	findAll() {
		const items = UserRepository.getAll();

		if (!items) {
			throw Error("Users don't found");
		}
		return items;
	}

	search(search) {
		const item = UserRepository.getOne(search);
		if (!item) {
			return new Error({ message: "Not found user" });
		}
		return item;
	}
}

module.exports = new UserService();
