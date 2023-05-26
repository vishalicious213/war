const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
const player1 = document.getElementById("player-1")
const player2 = document.getElementById("player-2")
let deckID = "70p5jer1mr9o"

// ⬇️ HELPER FUNCTIONS ⬇️

function getCardValues(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1value = cardValues.indexOf(card1)
    const card2value = cardValues.indexOf(card2)

    console.log("card 1:", card1, card1value)
    console.log("card 2:", card2, card2value)

    if (card1value > card2value) {
        console.log("Player 1 wins!")
    } else if (card1value < card2value) {
        console.log("Player 2 wins!")
    } else {
        console.log("WAR!")
    }
}

// ⬇️ EVENT LISTENERS ⬇️

newDeckBtn.addEventListener("click", getNewDeck)

drawBtn.addEventListener("click", getNewCards)

// ⬇️ EVENT HANDLERS ⬇️

function getNewDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckID = data.deck_id
        })
}

function getNewCards() {
    console.log(deckID)
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        renderCards(data.cards[0].image, data.cards[1].image)
        getCardValues(data.cards[0].value, data.cards[1].value)
    })
}

// ⬇️ RENDER APP ⬇️

function renderCards(player1Card, player2Card) {
    player1.innerHTML = `
        <h2 id="player-1-wins">Player 1</h2>
        <img src="${player1Card}">
    `

    player2.innerHTML = `
        <img src="${player2Card}">
        <h2 id="player-2-wins">Player 2</h2>
    `
}