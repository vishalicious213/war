const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
const player1 = document.getElementById("player-1")
const player2 = document.getElementById("player-2")
const player1Card = document.getElementById("player-1-card")
const player2Card = document.getElementById("player-2-card")
const player1Wins = document.getElementById("player-1-wins")
const player2Wins = document.getElementById("player-2-wins")
const count = document.getElementById("count")

let deckID = "y5rko9w9a7jj"

// ⬇️ HELPER FUNCTIONS ⬇️

function getCardValues(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1value = cardValues.indexOf(card1)
    const card2value = cardValues.indexOf(card2)

    if (card1value > card2value) {
        player1Wins.innerText = "Player 1 wins!"
    } else if (card1value < card2value) {
        player2Wins.innerText = "Player 2 wins!"
    } else {
        player1Wins.innerText = "WAR!"
        player2Wins.innerText = "WAR!"
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
        renderCards(data.cards[0].image, data.cards[1].image, data.remaining)
        getCardValues(data.cards[0].value, data.cards[1].value)
    })
}

// ⬇️ RENDER APP ⬇️

function renderCards(p1Card, p2Card, remaining) {
    player1Card.src = p1Card
    player1Wins.innerText = "Player 1"

    player2Card.src = p2Card
    player2Wins.innerText = "Player 2"

    count.innerText = remaining
}