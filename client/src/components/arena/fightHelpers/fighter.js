export class fighter {
  constructor(data) {
    console.log(data);
    this.combo = data.combo;
    this.cooldown = Date.now() - 10000;
    this.attack = data.attack;
    this.block = data.block;
  }
  
  
  
}