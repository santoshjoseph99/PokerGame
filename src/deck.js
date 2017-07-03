// @flow
var Card = require('./card');

class Deck {
  cards: Card[];
  index: number;

  constructor(){
    this.cards = new Array(52);
    this.cards[0] = new Card('a', 's');
    this.cards[1] = new Card('2', 's');
    this.cards[2] = new Card('3', 's');
    this.cards[3] = new Card('4', 's');
    this.cards[4] = new Card('5', 's');
    this.cards[5] = new Card('6', 's');
    this.cards[6] = new Card('7', 's');
    this.cards[7] = new Card('8', 's');
    this.cards[8] = new Card('9', 's');
    this.cards[9] = new Card('10', 's');
    this.cards[10] = new Card('j', 's');
    this.cards[11] = new Card('q', 's');
    this.cards[12] = new Card('k', 's');

    this.cards[13] = new Card('a', 'c');
    this.cards[14] = new Card('2', 'c');
    this.cards[15] = new Card('3', 'c');
    this.cards[16] = new Card('4', 'c');
    this.cards[17] = new Card('5', 'c');
    this.cards[18] = new Card('6', 'c');
    this.cards[19] = new Card('7', 'c');
    this.cards[20] = new Card('8', 'c');
    this.cards[21] = new Card('9', 'c');
    this.cards[22] = new Card('10', 'c');
    this.cards[23] = new Card('j', 'c');
    this.cards[24] = new Card('q', 'c');
    this.cards[25] = new Card('k', 'c');

    this.cards[26] = new Card('a', 'h');
    this.cards[27] = new Card('2', 'h');
    this.cards[28] = new Card('3', 'h');
    this.cards[29] = new Card('4', 'h');
    this.cards[30] = new Card('5', 'h');
    this.cards[31] = new Card('6', 'h');
    this.cards[32] = new Card('7', 'h');
    this.cards[33] = new Card('8', 'h');
    this.cards[34] = new Card('9', 'h');
    this.cards[35] = new Card('10', 'h');
    this.cards[36] = new Card('j', 'h');
    this.cards[37] = new Card('q', 'h');
    this.cards[38] = new Card('k', 'h');

    this.cards[39] = new Card('a', 'd');
    this.cards[40] = new Card('2', 'd');
    this.cards[41] = new Card('3', 'd');
    this.cards[42] = new Card('4', 'd');
    this.cards[43] = new Card('5', 'd');
    this.cards[44] = new Card('6', 'd');
    this.cards[45] = new Card('7', 'd');
    this.cards[46] = new Card('8', 'd');
    this.cards[47] = new Card('9', 'd');
    this.cards[48] = new Card('10', 'd');
    this.cards[49] = new Card('j', 'd');
    this.cards[50] = new Card('q', 'd');
    this.cards[51] = new Card('k', 'd');
    this.index = 0;
  }

  getCards(): Card[] {
    return this.cards;
  }

  shuffle(){
    this.index = 0;
    for(let i = 0; i < this.cards.length; i++){
      const x = Math.floor(Math.random() * this.cards.length);
      const t = this.cards[i];
      this.cards[i] = this.cards[x];
      this.cards[x] = t;
    }
  }

  popCard(): Card {
    return this.cards[this.index++];
  }
}

module.exports = Deck;