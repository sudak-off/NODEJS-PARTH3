const { FighterRepository } = require("../repositories/fighterRepository");

class FighterService {
	// TODO: Implement methods to work with fighters

	findAll() {
		const items = FighterRepository.getAll();

		if (!items) {
			throw Error("Fighter don't found");
		}
		return items;
	}

	search(search) {
		const item = UserRepository.getOne(search);
		if (!item) {
			return new Error({ message: "Not found fighter" });
		}
		return item;
	}
}

module.exports = new FighterService();
