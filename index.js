//setting deck_id to empty string
let deckId = "";
// 1. Create a new deck of cards
function newDeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
        //store the deck_id in a variable
        deckId = data.deck_id
        console.log(deckId)
       console.log(data)
    })
}
//Define our anonymous callback function as a separate function, then pass it as the 2nd parameter to our `addEventListener`
// add function to the button to draw new cards from api
document.getElementById('new-deck').addEventListener('click', newDeck)
