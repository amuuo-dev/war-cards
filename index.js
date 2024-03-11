//setting deck_id to empty string
let deckId = "";
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
// 1. Create a new deck of cards
function newDeck(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then(res => res.json())
    .then(data => {
       console.log(data)
         //store the deck_id in a variable
       deckId = data.deck_id
       console.log(deckId)
    })
}
//Define our anonymous callback function as a separate function, then pass it as the 2nd parameter to our `addEventListener`
// add function to the button to draw new cards from api
newDeckBtn.addEventListener('click', newDeck)
// draw two new cards from the deck
drawCardBtn.addEventListener('click', function(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        console.log(data.cards)
        //display the cards on the page
        cardsContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card" />
    `
    cardsContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card" />
    `
    })
})
function determineCardWinner(card1,card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)
}

const card1Obj = {
    value: "7"
}
const card2Obj = {
    value: "KING"
}

determineCardWinner(card1Obj, card2Obj)

