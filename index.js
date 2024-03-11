//setting deck_id to empty string
let deckId = "";
let computerScore = 0
let myScore = 0
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardBtn = document.getElementById("draw-cards")
const header = document.getElementById("header")
const remainingText = document.getElementById("remaining")
const computerScoreEl = document.getElementById("computer-score")
const myScoreEl = document.getElementById("my-score")
// 1. Create a new deck of cards
async function newDeck(){
 const res= await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
 const data= await res.json()
    remainingText.textContent = `Remaining cards: ${data.remaining}`
    console.log(data)
      //store the deck_id in a variable
    deckId = data.deck_id
    console.log(deckId)
}
//Define our anonymous callback function as a separate function, then pass it as the 2nd parameter to our `addEventListener`
// add function to the button to draw new cards from api
newDeckBtn.addEventListener('click', newDeck)
 

// draw two new cards from the deck
drawCardBtn.addEventListener('click', async function(){
    const res=await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    const data=await res.json()
       
    remainingText.textContent = `Remaining cards: ${data.remaining}`

    //display the cards on the page
    cardsContainer.children[0].innerHTML = `
    <img src=${data.cards[0].image} class="card" />
`
cardsContainer.children[1].innerHTML = `
    <img src=${data.cards[1].image} class="card" />
`
const winnerText = determineCardWinner(data.cards[0], data.cards[1])
header.textContent = winnerText

if(data.remaining === 0){
    drawCardBtn.disabled = true
   if(computerScore>myScore){
       header.textContent = "Computer Wins the game!"
   }
   else if(myScore>computerScore){
    header.textContent= "You Win the game!"
   }
   else{
    header.textContent= "It's a tie game!"
   }
}

})
function determineCardWinner(card1,card2){
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)

    if (card1ValueIndex > card2ValueIndex) {
        computerScore++
        computerScoreEl.textContent = `Computer score: ${computerScore}`
        return "Computer Wins!"
    } else if (card1ValueIndex < card2ValueIndex) {
        myScore++
        myScoreEl.textContent = `My score: ${myScore}`
        return "You Win!"
    } else {
        return "War!"
    }
}
