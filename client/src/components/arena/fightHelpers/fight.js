function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export function getDamage(attacker, defender) {
  const damage = getHitPower(attacker) - getBlockPower(defender);
  return damage > 0 ? damage : 0;
}

export function getHitPower(fighter) {
  const criticalHitChance = getRandomArbitrary(0.2, 0.7) ;
  const power = fighter.power * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  const dodgeChance = Math.random() + 1;
  const blockPower = fighter.defense * dodgeChance;
  return blockPower;
}

export function onKeydown(atacker, defender, fighterHealthLeft, showDamage, style) {
  const damage = getDamage(atacker, defender);
  showDamage.className = `arena___damageBlock ${style}`;
  if (!damage) {
    showDamage.innerHTML = 'Blocked';
    return fighterHealthLeft;
  } else {
    showDamage.innerHTML = damage.toFixed(3);
    fighterHealthLeft -= damage

    return fighterHealthLeft > 0 ? fighterHealthLeft : 0;
  }
}

export function fighterHealthInPercents(target, fighter, healthBar) {
  const barWidthInPercents = (target * 100) / fighter.health;
  healthBar.style.width = `${barWidthInPercents}%`;
}

export function criticalDamage(fighter, set, cooldown) {
  const currentTime = Date.now();
  if (currentTime - cooldown < 10000) {
    set.clear();
    return false;
  }
  let critical = 0;
  if (fighter.power < 20) {
    critical = fighter.power * 0.7
  } else if (fighter.power < 60) {
    critical = fighter.power * 0.5
  } else {
    critical = fighter.power * 0.3
  }
  cooldown = currentTime;
  set.clear();
  return {
    critical,
    cooldown
  };
}