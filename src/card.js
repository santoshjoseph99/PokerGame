// @flow

class Card {
  rank: string;
  suite: string;
  constructor(rank: string, suite: string){
    this.rank = rank;
    this.suite = suite;
  }
}


module.exports = Card;