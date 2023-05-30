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
const battlefield = document.getElementById("battlefield")

let deckID = ""
let remainingCards
let p1Score = 0
let p2Score = 0

// ⬇️ HELPER FUNCTIONS ⬇️

function getCardValues(card1, card2) {
    const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1value = cardValues.indexOf(card1)
    const card2value = cardValues.indexOf(card2)

    renderScores(card1value, card2value)
}

// ⬇️ EVENT LISTENERS ⬇️

newDeckBtn.addEventListener("click", getNewDeck)

drawBtn.addEventListener("click", getNewCards)

// ⬇️ EVENT HANDLERS ⬇️

function getNewDeck() {
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            deckID = data.deck_id
            remainingCards = data.remaining
            count.innerText = data.remaining
            drawBtn.disabled = false
            cardsLeft.classList.remove("hide")
        })
}

function getNewCards() {
    if (!deckID) return
    if (remainingCards === 0) return

    // console.log(deckID)
    fetch(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        // console.log(data)
        renderCards(data.cards[0].image, data.cards[1].image, data.remaining)
        getCardValues(data.cards[0].value, data.cards[1].value)
        remainingCards = data.remaining
        if (remainingCards === 0) {
            drawBtn.disabled = true

            if (p1Score > p2Score) {
                renderWin(1, data.cards[0].image, data.cards[1].image)
            } else if (p1Score < p2Score) {
                renderWin(2, data.cards[1].image, data.cards[0].image)
            } else {
                renderWin(0, data.cards[0].image, data.cards[1].image)
            }
        }
    })
}

// ⬇️ RENDER APP ⬇️

function renderCards(p1Card, p2Card, remaining) {
    player1Card.src = p1Card
    player1Text.innerText = "Player 1"

    player2Card.src = p2Card
    player2Text.innerText = "Player 2"

    count.innerText = remaining
}

function renderScores(card1value, card2value) {
    if (card1value > card2value) {
        player1Text.innerText = "Player 1 wins round!"
        player2Text.innerText = "Player 2 lost round!"
        player1Text.style.color = "gold"
        player2Text.style.color = "red"
        p1Score ++
        player1Score.innerText = p1Score
    } else if (card1value < card2value) {
        player1Text.innerText = "Player 1 lost round!"
        player2Text.innerText = "Player 2 wins round!"
        player1Text.style.color = "red"
        player2Text.style.color = "gold"
        p2Score ++
        player2Score.innerText = p2Score
    } else {
        player1Text.innerText = "WAR!"
        player2Text.innerText = "WAR!"
        player1Text.style.color = "red"
        player2Text.style.color = "red"
    }
}

function renderWin(winner, p1card, p2card) {
    console.log("WINNER!")

    if (winner === 0) {
        battlefield.innerHTML = `
            <div>
                <h2>TIE</h2>
                <img class="tie" src="${p1card}">
                <img class="tie" src="${p2card}">
            </div>
        `
    }

    if (winner === 1) {
        battlefield.innerHTML = `
            <div>
                <h2>PLAYER 1 WINS</h2>
                <img class="win" src="${p1card}">
                <img class="lost" src="${p2card}">
            </div>
        `
    }

    if (winner === 2) {
        battlefield.innerHTML = `
            <div>
                <h2>PLAYER 2 WINS</h2>
                <img class="lost" src="${p1card}">
                <img class="win" src="${p2card}">
            </div>
        `
    }
}