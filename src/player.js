// @flow

var Card = require('./card');

class Player {
  position: number;
  money: number;
  cards: Card[];
  sitOut: boolean;
}

module.exports = Player;