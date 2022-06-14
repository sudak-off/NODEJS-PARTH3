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

	create(userData) {
		const checkEmailAllUsers = UserRepository.getOne({
			email: userData.email,
		});
		if (!checkEmailAllUsers) {
			const user = UserRepository.create(userData);
			if (!user) {
				throw Error("Server error");
			}
			return user;
		} else {
			throw Error("User with this email is registered");
		}
	}

	update(id, user) {
		const userId = UserRepository.getOne({ id });

		if (!userId) {
			throw Error("User this id not found");
		}

		let forUpdate = {};

		for (let param in user) {
			!!user[param] && (forUpdate[param] = user[param]);
		}

		const updateUser = UserRepository.update(id, forUpdate);

		if (!updateUser) {
			throw Error("User don't update");
		}

		return updateUser;
	}

	delete(id) {
		const user = UserRepository.delete(id);
		if (!user.length) {
			throw Error("User don't found");
		}
		return user;
	}
	//sudak
}

module.exports = new UserService();
