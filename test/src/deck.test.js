
var Deck = require('../../lib/deck');

describe('Deck', function(){
  var deck = new Deck();
  context('when creating a standard deck', function(){
    it('should have 52 cards', function(){
      expect(deck.getCards()).to.have.length(52);
    });

    it('should have no jokers', function(){
      var cards = deck.getCards();
      cards.forEach(card => {
        expect(card.rank).to.not.equal('joker');
      })
    });

    it('should have 13 cards from each suite', function(){
      var cards = deck.getCards();
      var num = 0;
      cards.forEach(card => {
        if(card.suite === 's'){
          num++;
        }
      });
      expect(num).to.equal(13);
    });

    it('should have 4 cards of each rank', function(){
      var cards = deck.getCards();
      var num = 0;
      cards.forEach(card => {
        if(card.rank === 'a'){
          num++;
        }
      });
      expect(num).to.equal(4);
    });

    it('', function(){
      
    })
  })
})