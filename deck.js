function cards() {

  var deck = [ ...Array(52).keys() ];
  var graveyard = [];
  // this is just to get a random int
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  };

  // this function is to reset the deck and shuffle it
	function reset() {
    graveyard = [] // all elements are in deck
 		deck = [ ...Array(52).keys() ];
    return true
  }
  function getCard(cardNumber) {
    const type = ['Spades', 'Hearts', 'Diamonds', 'Clubs'];
    const cardName = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
    return cardName[cardNumber%13] + ' of ' + type[cardNumber%4]
  };

  // This function is to shuffle remaining cards in the deck
  function shuffle() {
    let newDeck = []
    while(deck.length) {
      let index = getRandomInt(deck.length); // index for a random element
      newDeck.push(deck.splice(index, 1)[0]); // this will remove 1 random element and add to new array
    }
    deck = newDeck.slice() // creates a copy of array
    return true
  };

  // draws a card and adds it to graveyard
  function draw() {
  	let drawnCard = deck.pop()
    if(drawnCard == undefined) return 'empty' // in case deck has no more cards and need to reset
    graveyard.push(drawnCard)
  	return getCard(drawnCard)
  };

  // draws deck and puts it into matrix, the matrix is [players[cards]]
  function drawDeckForPlayers(numberOfPlayers = 1) {
    if(numberOfPlayers < 1) return 'numberOfPlayers has to be larger then 0'
    let players = []
    for(let i = 0; i < numberOfPlayers; i++) players.push([]);
    for(let i = 0; 0 < deck.length; i++) {
      players[i%numberOfPlayers].push(this.draw());
    }
    return players;
  };

	return {
  	reset,
		shuffle,
		draw,
    drawDeckForPlayers
	};

}
module.exports = cards
