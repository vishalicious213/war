const newDeckBtn = document.getElementById("new-btn")
let deckID = ""

// ⬇️ EVENT LISTENERS ⬇️

newDeckBtn.addEventListener("click", getNewDeck)

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