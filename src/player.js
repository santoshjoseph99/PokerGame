// @flow

var Card = require('./card');

class Player {
  position: number;
  money: number;
  cards: Card[];
}

module.exports = Player;