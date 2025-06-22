let sum = 0;
let iterations = 10000;
let min = Infinity;
let max = -Infinity;
for (let i = 0; i < iterations; i++) {
    let rounds_played = start();
    sum += rounds_played;
}
console.log("\n\n\nWar Game Simulation Results:");
console.log("Total War games played: "+iterations);
console.log("Average length of game: "+(sum / iterations).toFixed(2)+" rounds.");
console.log("Shortest game played: "+min+" rounds.");
console.log("Longest game played: "+max+" rounds.");

function start() {
    let deck = getDeck();
    let {deck1, deck2} = splitDeck(deck);
    let round = 0;
    while (deck1.length > 0 && deck2.length > 0) {
        let card1 = drawCard(deck1);
        let card2 = drawCard(deck2);
        if(card1.rank > card2.rank) {
            deck1.push(card1, card2);
            console.log(round+". Team 1's "+card1.rank+" beats "+"Team 2's "+card2.rank);
        } else if(card2.rank > card1.rank) {
            deck2.push(card1, card2);
            console.log(round+". Team 2's "+card2.rank+" beats "+"Team 1's "+card1.rank);
        } else {
            tie(card1, card2, deck1, deck2);
        }
        console.log("Team 1's deck size: "+deck1.length+", Team 2's deck size: "+deck2.length);
        round++;
    }
    if (deck1.length > 0) {
        console.log("Player 1 wins!");
    } else if (deck2.length > 0) {
        console.log("Player 2 wins!");
    } else {
        console.log("It's a tie!");
    }
    if(round < min) {
        min = round;
    }
    if(round > max) {
        max = round;
    }
    return round;
}

function splitDeck(deck) {
    let deck1 = [];
    let deck2 = [];
    for (let i = 0; i < deck.length; i++) {
        if (i % 2 === 0) {
            deck1.push(deck[i]);
        } else {
            deck2.push(deck[i]);
        }
    }
    return {deck1, deck2};
}

function tie(card1, card2, deck1, deck2) {
    let drawNum = 4;
    let spoils = [card1, card2];
    let maxWarRounds = 100;  // safety cap

    while (maxWarRounds > 0) {
        if (deck1.length < drawNum) {
            deck2.push(...deck1, ...spoils);
            deck1.length = 0;
            return;
        }
        if (deck2.length < drawNum) {
            deck1.push(...deck2, ...spoils);
            deck2.length = 0;
            return;
        }

        let draw1 = [];
        let draw2 = [];
        for (let i = 0; i < drawNum - 1; i++) {
            draw1.push(drawCard(deck1));
            draw2.push(drawCard(deck2));
        }

        let tieCard1 = drawCard(deck1);
        let tieCard2 = drawCard(deck2);
        spoils.push(...draw1, ...draw2, tieCard1, tieCard2);

        if (tieCard1.rank > tieCard2.rank) {
            spoils = shuffleDeck(spoils);
            deck1.push(...spoils);
            console.log("Team 1's "+tieCard1.rank+" beats "+"Team 2's "+tieCard2.rank+" in a war!");
            return;
        } else if (tieCard2.rank > tieCard1.rank) {
            spoils = shuffleDeck(spoils);
            deck2.push(...spoils);
            console.log("Team 2's "+tieCard2.rank+" beats "+"Team 1's "+tieCard1.rank+" in a war!");
            return;
        }
        maxWarRounds--;
    }

    // If reached here, force a draw or randomly assign spoils
    spoils = shuffleDeck(spoils);
    if (Math.random() < 0.5) {
        deck1.push(...spoils);
    } else {
        deck2.push(...spoils);
    }
}

function drawCard(deck) {
    if (deck.length === 0) {
        throw new Error("No cards left in the deck");
    }
    return deck.pop();
}   

function unshuffledDeck() {
    let deck = [];
    for(let i=0;i<13;i++) {
        for(let j=0;j<4;j++) {
            deck.push({rank: i, suit: j});
        }
    }
    return deck;
}

function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

function getDeck() {
    let deck = unshuffledDeck();
    return shuffleDeck(deck);
}
