const drawBtn = document.getElementById("draw-btn")

// ⬇️ EVENT LISTENERS ⬇️

drawBtn.addEventListener("click", drawCard)

// ⬇️ EVENT HANDLERS ⬇️

function drawCard() {
    console.log("DRAW")
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => console.log(data))
}