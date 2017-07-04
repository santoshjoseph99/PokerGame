// @flow

var Deck = require('./deck');
var Player = require('./player');
var GameTypes = require('./game-types');
var R = require('ramda');

class Position {
  num: number
  player: Player
  constructor(num:number, player:?Player){
    this.num = num;
  }
}

let isEmptyPlayer = position => R.isNil(position.player);

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
      this.positions[i] = new Position(i);
    }
  }

  isPlayers(){

  }

  playerMoneyCheck(){

  }

  isPlayerSitOut(){
    
  }
  isEmptyPlayer(position:Position): boolean { 
    return R.isNil(position.player); }

  startGame(){
    let isEmptyPlayer = position => R.isNil(position.player);
    let isPlayer = R.complement(this.isEmptyPlayer);
    let numOfPlayers = R.length(R.filter(isPlayer, this.positions));
    if(numOfPlayers <= 1){
      return false;
    }
    this.deck = new Deck();
    return true;
  }

  startHand(){
    //player check (existence, money check, sit out check)
    this.deck.shuffle();
  }

  getOpenPositions(): number[] {
    let isEmptyPlayer = position => R.isNil(position.player);
    let pickNum = position => position.num;
    return R.map(pickNum, R.filter(isEmptyPlayer, this.positions));
  }

  isPositionOpen(position:number): boolean {
    return R.isNil(this.positions[position-1].player);
  }

  addPlayer(player: Player){

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