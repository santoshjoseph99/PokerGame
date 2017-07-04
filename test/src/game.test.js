
var Game = require('../../lib/game');
var Player = require('../../lib/player');

describe.only('Game', function(){
  context('when getting open positions', function(){
    context('when there are no players', function(){
      it('returns the number of open positions as table size', function(){
        const gameSize = 10;
        let game = new Game("NL Holdem", [], gameSize);
        const open = game.getOpenPositions();
        expect(open.length).to.be.equal(gameSize);
      });
    });
    context('when there are some players', function(){
      it('returns the table size minus the players', function(){
        const gameSize = 10;
        let game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()};
        game.positions[1] = {num: 1, player: new Player()};
        const open = game.getOpenPositions();
        expect(open.length).to.be.equal(8);
      });
    });
    context('when the table is full', function(){
      it('returns no open positions', function(){
        const gameSize = 3;
        let game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()};
        game.positions[1] = {num: 1, player: new Player()};
        game.positions[2] = {num: 1, player: new Player()};
        const open = game.getOpenPositions();
        expect(open.length).to.be.equal(0);
      });
    })
  });

  context('when adding a player', function(){
    context('on a empty table', function(){
      it('successfully adds the player', function(){
        let game = new Game("NL Holdem", [], 3);
        let result = game.addPlayerAtPosition(new Player(), 1);
        expect(result).to.be.true;
      });
    });
    context('on a table with some players', function(){
      it('successfully adds the player', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 2, player: new Player()}
        let result = game.addPlayerAtPosition(new Player(), 3);
        expect(result).to.be.true;
      });
    });
    context('at a position with a player already there', function(){
      it('does not add the player', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 2, player: new Player()}
        let result = game.addPlayerAtPosition(new Player(), 2);
        expect(result).to.be.false
      })
    })
    context('on a full table', function(){
       it('does not add the player', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 2, player: new Player()}
        game.positions[2] = {num: 3, player: new Player()}
        let result = game.addPlayerAtPosition(new Player(), 3);
        expect(result).to.be.false
      });
    });
  });

  context('when removing a player', function(){
    context('no player at that position', function(){
      it('returns an error', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 2, player: new Player()}
        game.positions[2] = {num: 3, player: undefined}
        let result = game.removePlayerAtPosition(3);
        expect(result).to.be.false
      });
    });
    context('player exists at that position', function(){
      it('succesfully removes the players', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 2, player: new Player()}
        game.positions[2] = {num: 3, player: undefined}
        let result = game.removePlayerAtPosition(2);
        expect(result).to.be.true
      });
    });
  });

  context('when starting a game', function(){
    context('with no players', function(){
      it('does not start', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        let result = game.startGame(3);
        expect(result).to.be.false
      })
    });
    context('with one player', function(){
      it('does not start', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        let result = game.startGame(3);
        expect(result).to.be.false
      });
    });
    context('with 2 players', function(){
      it('game starts', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 1, player: new Player()}
        let result = game.startGame(3);
        expect(result).to.be.true
      });
    });
    context('with more then 2 players', function(){
      it('game starts', function(){
        const gameSize = 3;
        game = new Game("NL Holdem", [], gameSize);
        game.positions[0] = {num: 1, player: new Player()}
        game.positions[1] = {num: 1, player: new Player()}
        game.positions[2] = {num: 1, player: new Player()}
        let result = game.startGame(3);
        expect(result).to.be.true
      });
    });
  });

  context('when playing a hand', function(){
    context('and all players have no money', function(){

    })
    context('and all but one player has no money', function(){
      
    })
    context('and all players are sitting out', function(){

    })
    context('and all but one player is sitting out', function(){
      
    })
    context('and all players fold', function(){
      it('big blind wins', function(){

      }) 
    });
    context('and all players go all in', function(){
       context('and everyone has equal money', function(){
         context('and everyone ties', function(){

         });
         context('and multiple people tie', function(){

         });
         context('and only one winner', function(){

         });
       });
       context('and everyone has unequal money', function(){

       })
    });
    context('and all players fold except blinds', function(){

    });
    context('and first player raises', function(){
      context('and no one calls', function(){

      });
      context('and one player calls', function(){

      });
      context('and button 3-bets', function(){
        context('and first raiser calls', function(){

        });
        context('and first raiser folds', function(){

        })
      });
    });
    context('and button raises', function(){
      context('and only small blind calls', function(){

      });
      context('and only big blind calls', function(){

      });
      context('both blinds call', function(){

      });
    });
  });
});