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
		const checkNameFighter = FighterRepository.getOne({
			name: fighterData.name,
		});

		const checkDefense = FighterRepository.getOne({
			defense: fighterData.defense,
		});

		const checkpower = FighterRepository.getOne({
			power: fighterData.power,
		});

		if (!fighterData.name) {
			throw new Error("Add name");
		}

		// && Number(defense) === defense
		if (!fighterData.defense) {
			throw new Error("add defense");
		}

		if (!Number.isFinite(fighterData.power)) {
			throw new Error("add power number");
		}

		if (typeof fighterData.defense !== "number") {
			throw new Error("add defense number");
		}

		// if (fighterData.power) {
		// 	throw new Error("add power number");
		// }

		if (!checkNameFighter) {
			// const newFighter = { ...fighter, ...fighterData };
			const itemFighter = FighterRepository.create(fighterData);
			if (!itemFighter) {
				return null;
			}
			delete fighterData.id;
			return itemFighter;
		} else {
			throw new Error("Fighter with this name is registered");
		}
	}

	delete(id) {
		const deleteFighter = FighterRepository.delete(id);
		if (!deleteFighter) {
			return null;
		}
		return deleteFighter;
	}

	update(id, fighter) {
		const checkNameFighter = FighterRepository.getOne({
			name: fighter.name,
		});

		if (!checkNameFighter) {
			const updatedFighter = FighterRepository.update(id, fighter);

			if (!updatedFighter) {
				return null;
			}

			return updatedFighter;
		} else {
			throw new Error("Fighter with this name is registered");
		}
	}
}

module.exports = new FighterService();
