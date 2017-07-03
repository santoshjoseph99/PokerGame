// @flow

var Game = require('./game');
var Player = require('./player');

class Table {
  game: Game;
  players: Player[];
}

module.exports = Table;