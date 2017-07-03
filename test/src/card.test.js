
var Card = require('../../lib/card');

describe('Card', function() {
  context('when creating with valid args', function(){
    it('does not throw an error', function(){
      var card = new Card('k', 's');
      expect(card.rank).to.equal('k');
      expect(card.suite).to.equal('s');
    });
  });
  // context('when creating with invalid args', function(){
  //   it('throws an error', function(){
  //     expect(new Card('x', 's')).to.throw();
  //   })
  // })
});
