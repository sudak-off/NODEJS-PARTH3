import React, { useState, useRef, useEffect } from "react";

import "./arena.css";
import ArenaComponent from "./ArenaComponent";
import ShowWinner from "./showWinner";
import { controls } from "./constants/controls";
import { sendLog } from "../../services/domainRequest/fightRequest";
import {
	criticalDamage,
	fighterHealthInPercents,
	onKeydown,
} from "./fightHelpers/fight";

const Arena = ({ fighter1, fighter2 }) => {
	const TIMEOUT = 10000;
	const [winner, setWinner] = useState(null);
	const [log, setLog] = useState({
		player: JSON.parse(localStorage.getItem("user")).email,
		fightStartedAt: new Date(),
		fighter1: fighter1.name,
		fighter2: fighter2.name,
		logging: ["Fight started"],
	});
	const [fightersCooldown, setCooldown] = useState({
		firstPlayerComboCooldown: Date.now() - TIMEOUT,
		secondPlayerComboCooldown: Date.now() - TIMEOUT,
	});
	const firstFighterBar = useRef(null);
	const secondFighterBar = useRef(null);
	const showDamage = useRef(null);
	const pressed = new Set();
	const {
		PlayerOneAttack,
		PlayerOneBlock,
		PlayerTwoAttack,
		PlayerTwoBlock,
		PlayerOneCriticalHitCombination,
		PlayerTwoCriticalHitCombination,
	} = controls;
	const [q, w, e] = PlayerOneCriticalHitCombination,
		[u, i, o] = PlayerTwoCriticalHitCombination;
	const [fightersHealthLeft, setFightersHealthLeft] = useState({
		firstFighterHealthLeft: +fighter1.health,
		secondFighterHealthLeft: +fighter2.health,
	});
	const sendLogs = (fighter) => {
		setLog({
			...log,
			logging: log.logging.push(`${fighter.name} has won this battle`),
		});
		sendLog(log);
		return true;
	};
	const getWinner = (winner) => {
		setWinner(fighter2);
		return true;
	};
	const writeLog = (atacker, defender, healthLeft) => {
		setLog({
			...log,
			logging: [
				...log.logging,
				`${atacker} makes damage, ${defender} ${healthLeft}% HP left`,
			],
		});
	};

	useEffect(() => {
		fighterHealthInPercents(
			fightersHealthLeft.firstFighterHealthLeft,
			fighter1,
			firstFighterBar.current
		);
		writeLog(
			fighter2.name,
			fighter1.name,
			fightersHealthLeft.firstFighterHealthLeft
		);
		fightersHealthLeft.firstFighterHealthLeft <= 0 &&
			getWinner(fighter2) &&
			sendLogs(fighter2);
	}, [fightersHealthLeft.firstFighterHealthLeft]);
	useEffect(() => {
		fighterHealthInPercents(
			fightersHealthLeft.secondFighterHealthLeft,
			fighter2,
			secondFighterBar.current
		);
		writeLog(
			fighter1.name,
			fighter2.name,
			fightersHealthLeft.secondFighterHealthLeft
		);
		fightersHealthLeft.secondFighterHealthLeft <= 0 &&
			getWinner(fighter1) &&
			sendLogs(fighter1);
	}, [fightersHealthLeft.secondFighterHealthLeft]);

	const onKeyDown = (event) => {
		const { firstFighterHealthLeft, secondFighterHealthLeft } =
			fightersHealthLeft;
		const { firstPlayerComboCooldown, secondPlayerComboCooldown } =
			fightersCooldown;
		pressed.add(event.which);
		let combo;
		switch (true) {
			case pressed.has(q) && pressed.has(w) && pressed.has(e):
				combo = criticalDamage(fighter1, pressed, firstPlayerComboCooldown);
				if (combo) {
					setCooldown({
						...fightersCooldown,
						firstPlayerComboCooldown: combo.cooldown,
					});
					setFightersHealthLeft({
						...fightersHealthLeft,
						secondFighterHealthLeft:
							(fightersHealthLeft.secondFighterHealthLeft -= combo.critical),
					});
				}
				break;
			case pressed.has(u) && pressed.has(i) && pressed.has(o):
				combo = criticalDamage(fighter2, pressed, secondPlayerComboCooldown);
				if (combo) {
					setCooldown({
						...fightersCooldown,
						secondPlayerComboCooldown: combo.cooldown,
					});
					setFightersHealthLeft({
						...fightersHealthLeft,
						firstFighterHealthLeft:
							(fightersHealthLeft.firstFighterHealthLeft -= combo.critical),
					});
				}
				break;
			case pressed.has(PlayerOneBlock):
			case pressed.has(PlayerTwoBlock):
				document.addEventListener("keyup", (event) => {
					event.which === PlayerOneBlock && pressed.delete(PlayerOneBlock);
					event.which === PlayerTwoBlock && pressed.delete(PlayerTwoBlock);
				});
				break;
			case pressed.has(PlayerOneAttack):
				setFightersHealthLeft({
					...fightersHealthLeft,
					secondFighterHealthLeft: onKeydown(
						fighter1,
						fighter2,
						fightersHealthLeft.secondFighterHealthLeft,
						showDamage.current,
						"arena___first-fighter-hit"
					),
				});
				//    fightersHealthLeft.secondFighterHealthLeft <= 0 && setWinner(fighter1);
				pressed.delete(PlayerOneAttack);
				break;
			case pressed.has(PlayerTwoAttack) && !pressed.has(PlayerTwoBlock):
				setFightersHealthLeft({
					...fightersHealthLeft,
					firstFighterHealthLeft: onKeydown(
						fighter2,
						fighter1,
						firstFighterHealthLeft,
						showDamage.current,
						"arena___second-fighter-hit"
					),
				});
				//    firstFighterHealthLeft <= 0 && setWinner(fighter2);
				pressed.delete(PlayerTwoAttack);
				break;
			default:
				break;
		}
	};

	return (
		<>
			{winner && <ShowWinner winner={winner} />}
			<ArenaComponent
				onKeyDown={onKeyDown}
				firstFighterBar={firstFighterBar}
				secondFighterBar={secondFighterBar}
				showDamage={showDamage}
				fighter1Name={fighter1.name}
				fighter2Name={fighter2.name}
			/>
		</>
	);
};

export default Arena;
