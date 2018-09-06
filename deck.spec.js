var assert = require('assert');
const deck = require('./deck');

describe('Deck Building', function() {

  describe('should have a deck', function() {
    it('should have all the functions', function(){
      const newDeck = deck();

      assert.equal((typeof(newDeck.draw)), 'function');
      assert.equal((typeof(newDeck.reset)), 'function');
      assert.equal((typeof(newDeck.drawDeckForPlayers)), 'function');
      assert.equal((typeof(newDeck.shuffle)), 'function');
    });

    it('should create a deck and draw first card', function(){
      const newDeck = deck();
      assert.equal(newDeck.draw(), 'Ace of Clubs'); // card value 52
    });

    it('should create a deck shuffle and reset it', function(){
      const newDeck = deck();
      assert.equal(newDeck.shuffle(), true); // make sure you can shuffle before running other test
      assert.equal(newDeck.reset(), true); // make sure you can reset after shuffle
    });

    it('should create a deck and not let user select less then 1 person', function(){
      const newDeck = deck();
      let warnning = newDeck.drawDeckForPlayers(-1); //normally i would throw an error but seemed poinless without chai

      assert.equal(warnning, 'numberOfPlayers has to be larger then 0');
    });

    it('should create a deck and draw all the card', function(){
      const newDeck = deck();
      newDeck.shuffle();
      let players = newDeck.drawDeckForPlayers(2);

      // make sure both players got the right amount of cards
      assert.equal(players.length, '2');
      assert.equal(players[1].length, '26');
      assert.equal(players[0].length, '26');

      // should also test that it had no dups
      for(let i = 0; i < players[0].length; i++) {
        assert.equal(players[1][i] == players[0][i], false);
      }

    });

    it('should create a deck draw 2 unique cards then shuffle and draw another unique card', function(){
      const newDeck = deck();
      assert.equal(newDeck.draw(), 'Ace of Clubs');
      assert.equal((newDeck.draw() == 'Ace of Clubs'), false); // this will be a diffrent card
      newDeck.shuffle();
      assert.equal((newDeck.draw() == 'Ace of Clubs'), false); // this should never return Ace of Clubs
    });

    it('should create a deck and not let user draw more then 52 cards before reset', function(){
      const newDeck = deck();
      newDeck.drawDeckForPlayers();
      assert.equal(newDeck.draw(), 'empty');
    });


  });
});
