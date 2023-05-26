const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
const player1 = document.getElementById("player-1")
const player2 = document.getElementById("player-2")
const player1Card = document.getElementById("player-1-card")
const player2Card = document.getElementById("player-2-card")
const player1Text = document.getElementById("player-1-text")
const player2Text = document.getElementById("player-2-text")
const player1Score = document.getElementById("player-1-score")
const player2Score = document.getElementById("player-2-score")
const count = document.getElementById("count")
const cardsLeft = document.getElementById("cards-left")

let deckID = ""
let remainingCards
let p1Score = 0
let p2Score = 0

// ⬇️ HELPER FUNCTIONS ⬇️

function getCardValues(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1value = cardValues.indexOf(card1)
    const card2value = cardValues.indexOf(card2)

    if (card1value > card2value) {
        player1Text.innerText = "Player 1 wins round!"
        p1Score ++
        player1Score.innerText = p1Score
    } else if (card1value < card2value) {
        player2Text.innerText = "Player 2 wins round!"
        p2Score ++
        player2Score.innerText = p2Score
    } else {
        player1Text.innerText = "WAR!"
        player2Text.innerText = "WAR!"
    }
}

// ⬇️ EVENT LISTENERS ⬇️

newDeckBtn.addEventListener("click", getNewDeck)

drawBtn.addEventListener("click", function() {
    if (remainingCards === 0) {
        drawBtn.disabled = true
    } else {
        getNewCards()
    }
})

// ⬇️ EVENT HANDLERS ⬇️

function getNewDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckID = data.deck_id
            remainingCards = data.remaining
            count.innerText = data.remaining
            drawBtn.disabled = false
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
        remainingCards = data.remaining
    })
}

// ⬇️ RENDER APP ⬇️

function renderCards(p1Card, p2Card, remaining) {
    player1Card.src = p1Card
    player1Text.innerText = "Player 1"

    player2Card.src = p2Card
    player2Text.innerText = "Player 2"

    count.innerText = remaining
    cardsLeft.classList.remove("hide")
}