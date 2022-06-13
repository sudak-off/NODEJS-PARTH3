const { fighter } = require("../models/fighter");
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
		const item = FighterRepository.getOne(search);
		if (!item) {
			return new Error({ message: "Not found fighter" });
		}
		return item;
	}

	create(fighterData) {
		const newFighter = { ...fighter, ...fighterData };
		const itemFighter = FighterRepository.create(newFighter);

		if (!itemFighter) {
			return null;
		}

		return itemFighter;
	}

	delete(id) {
		const deleteFighter = FighterRepository.delete(id);
		if (!deleteFighter) {
			return null;
		}
		return deleteFighter;
	}
}

module.exports = new FighterService();
