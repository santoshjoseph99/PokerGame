// @flow

var Card = require('./card');

class Player {
  position: number;
  money: number;
  cards: Card[];
  sitOut: boolean;
  name: string;
}

module.exports = Player;