const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
const player1 = document.getElementById("player-1")
const player2 = document.getElementById("player-2")
let deckID = ""

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
    .then(data => console.log(data))
}

// ⬇️ RENDER APP ⬇️

function renderCards(player1Card, player2Card) {
    player1.innerHTML = `
        <img src="${player1Card}">
    `

    player2.innerHTML = `
    <img src="${player2Card}">
`
}