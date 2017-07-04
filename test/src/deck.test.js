
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

    it('popCards should return 52 cards then null', function(){
      deck = new Deck();
      let cards = deck.getCards();
      for(let i=0; i < 52; i++){
        let card = deck.popCard();
        expect(card).to.be.not.null;
      }
      let nullCard = deck.popCard();
      expect(nullCard).to.be.null;
    });

    context('when calling reset', function(){
      it('sets the deck to the inital state', function(){
        let deck1 = new Deck();
        let deck2 = new Deck();
        deck2.shuffle();
        deck2.reset();
        let card1 = deck1.popCard();
        let card2 = deck2.popCard();
        expect(card1).to.be.deep.equal(card2);
      });
    });
  });
})