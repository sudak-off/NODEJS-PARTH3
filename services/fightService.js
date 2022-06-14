const { FightRepository } = require("../repositories/fightRepository");

class FightersService {
	// OPTIONAL TODO: Implement methods to work with fights

	getAll() {
		const logs = FightRepository.getAll();
		if (!logs.length) {
			throw Error("No logs");
		}
		return logs;
	}

	getLogById(id) {
		const log = FightRepository.getOne({ id });
		if (!log) {
			throw Error("Log not found");
		}
		return log;
	}

	writeLog(data) {
		const log = FightRepository.create(data);
		if (!log) {
			throw Error("Error writing");
		}
		return log;
	}

	delete(id) {
		const item = FightRepository.delete(id);
		if (!item) {
			return null;
		}
		return item;
	}
}

module.exports = new FightersService();
