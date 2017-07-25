// @flow

var Deck = require('./deck');
var Player = require('./player');
var Position = require('./position');
var GameTypes = require('./game-types');
var R = require('ramda');


let isEmptyPlayer = position => R.isNil(position.player);
let isPlayer = R.complement(isEmptyPlayer);
let numOfPlayers = (positions) => R.length(R.filter(isPlayer, positions));
// let enoughMoneyToPost = (player, blind) => R.gte(player.money, blind);
let getPlayers = (positions) => R.filter(isPlayer, R.map(R.pick(['player']), positions));
// let doPlayersHaveMoney = (positions) => {
  // let players = R.filter(enoughMoneyToPost, getPlayers(positions))
  // return R.gt(players.length, 1);
// }
let isPlayerSittingOut = (player) => player.sitOut;
let areAllPlayersSittingOut = (positions) => {
  let players = R.filter(isPlayerSittingOut, getPlayers(positions));
  return R.equals(players.length, 0);
}
let enoughPlayersToPlay = (positions) => {
  let players = R.filter(isPlayer, positions);
  return R.gt(players.length, 1);
}
let isValidPlayer = (blind, player) => {
  return player && !player.sitOut && player.money >= blind;
}
let numOfValidPlayers = (blind, players) => {
  let isValidPlayerWithBlind = R.curry(isValidPlayer);
  return R.length(R.filter(isValidPlayerWithBlind(blind), players));
}
let getNextValidPlayer = (blind, position, positions, maxPosition) => {
  if(position === maxPosition){
    position = 1;
  } else {
    position += 1;
  }
  let nextPlayer = positions[position];
  if(isValidPlayer(blind, nextPlayer)){
    return nextPlayer;
  }
  return getNextValidPlayer(blind, position, positions, maxPosition);
}
let isValidPosition = (blind, position) => {
  return isValidPlayer(blind, position.player);
}
let getValidPositions = (blind, positions) => {
  let isValidPostitionWithBlind = R.curry(isValidPosition);
  return R.filter(isValidPostitionWithBlind(blind), positions);
}
let isEmptyPosition = (position, positions) => {
  return R.isNil(positions[position-1].player);
}
let isPositionHaveButton = (position) => {
  return position.button;
}
let getButtonPosition = (positions) => {
  return R.filter(isPositionHaveButton, positions);
}
let getNextOpenPosition = (positions) => {
  return R.find(isEmptyPlayer, positions);
}
let sitOutInvalidPlayer = (player) => {
  if(!isValidPlayer(player)){
    player.sitOut = true;
  }
}

class Game {
  type: string;
  blinds: number[];
  deck: Deck;
  players: Player[];
  positions: Position [];

  constructor(type:string, blinds: number[], tableSize: number){
    this.type = type;
    this.blinds = blinds;
    this.positions = new Array(tableSize);
    for(let i = 0; i < tableSize; i++){
      this.positions[i] = new Position(i+1);
    }
  }

  startGame(){
    if(numOfPlayers(this.positions) <= 1){
      return false;
    }
    this.deck = new Deck();
    this._setInitialButton();
    return true;
  }

  _setInitialButton() {
    this.deck.shuffle();
    let positions = getValidPositions(this.blinds[0], this.positions);
    while(true){
      let found = false;
      for(let i = 0; i < positions.length; i++){
        let c = this.deck.popCard();
        if(!found && c && c.rank === 'a'){
          positions[i].button = true;
          found = true;
          break;
        }
      }
      if(found){
        break;
      }
    }
    this.deck.reset();
  }

  startHand(): boolean {
    if(numOfPlayers(this.positions) <= 1){
      return false;
    }
    if(numOfValidPlayers(this.blinds[0], getPlayers(this.positions)) <= 1){
      return false;
    }
    let players = getPlayers(this.positions);
    R.forEach(sitOutInvalidPlayer, players);
    this.deck.shuffle();
    //get blinds
    //deal cards
    //get action from each of players

    return true;
  }

  getBigBlind(): number {
    return this.blinds[0];
  }

  getSmallBlind(): number {
    return this.blinds[1];
  }

  endHand() {
    //move button
    //set player status
    //
  }

  getPlayerAt(position:number): Player {
    return this.positions[position-1].player;
  }

  getButton(): number {
    return getButtonPosition(this.positions)[0].num;
  }

  getOpenPositions(): number[] {
    let pickNum = position => position.num;
    return R.map(pickNum, R.filter(isEmptyPlayer, this.positions));
  }

  isPositionOpen(position:number): boolean {
    return R.isNil(this.positions[position-1].player);
  }

  addPlayer(player: Player): boolean {
    if(this.isTableFull()){
      return false;
    }
    let position = getNextOpenPosition(this.positions);
    return this.addPlayerAtPosition(player, position.num);
  }

  isTableFull(): boolean {
    return this.getOpenPositions().length == 0;
  }

  addPlayerAtPosition(player: Player, position:number): boolean {
    if(this.isTableFull()){
      return false;
    }
    if(R.isNil(this.positions[position-1].player)){
      let newPosition = new Position(position, player);
      this.positions = R.update(position-1, newPosition, this.positions);
      return true;
    }
    return false;
  }

  removePlayerAtPosition(position: number): boolean {
    if(R.isNil(this.positions[position-1].player)){
      return false;
    }
    let newPosition = new Position(position);
    this.positions = R.update(position-1, newPosition, this.positions);
    return true;
  }
}

module.exports = Game;