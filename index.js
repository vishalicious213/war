const newDeckBtn = document.getElementById("new-btn")
const drawBtn = document.getElementById("draw-btn")
let deckID = ""

// ⬇️ EVENT LISTENERS ⬇️

newDeckBtn.addEventListener("click", getNewDeck)

drawBtn.addEventListener("click", getNewCards)

// ⬇️ EVENT HANDLERS ⬇️

function getNewDeck() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            console.log(data)
            deckID = data.deck_id
            console.log(deckID)
        })
}

function getNewCards() {
    console.log("GET")
}