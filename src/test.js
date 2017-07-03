var Hand = require('pokersolver').Hand;

var hand1 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', '3c', 'Kd']);
var hand2 = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
var winner = Hand.winners([hand1, hand2]); // hand2
console.log(hand1.rank, hand2.rank);
var hand = Hand.solve(['Ad', 'As', 'Jc', 'Th', '2d', 'Qs', 'Qd']);
console.log(hand.name); // Two Pair
console.log(hand.descr); // Two Pair, A's & Q's

/*
class:
PokerGameType
PokerGame - gameType, blinds
Deck - collection of cards
Card - rank & suite
PokerPlayer - money, position
PokerTable - game & collection of players

*/