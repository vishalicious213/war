const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
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