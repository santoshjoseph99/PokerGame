var Player = require('./player');

class Position {
  num: number
  player: ?Player
  button: boolean

  constructor(num:number, player:?Player){
    this.num = num;
    this.player = player;
    this.button = false;
  }
}

module.exports = Position;