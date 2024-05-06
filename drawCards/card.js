const baseUrl = "https://deckofcardsapi.com/api/deck"

/* 1 */
async function newDraw(){
    try{
        let resp = await axios.get(`${baseUrl}/new/draw/?count=1`)
        let value = (resp.data.cards[0].value)
        let suit = (resp.data.cards[0].suit)
        console.log(`${value} of ${suit}`)
    }
    catch(e){
        console.log(e)
    }
}
newDraw()


/* 2 */
async function drawTwoCards(){
    try{
        let firstCardResp = await axios.get(`${baseUrl}/new/draw/?count=1`)
        const deckId = firstCardResp.data.deck_id
        let secCardResp = await axios.get(`${baseUrl}/${deckId}/draw/?count=1`)
        
        let cardData = [firstCardResp, secCardResp]
        cardData.forEach(card => {
            let {suit, value} = card.data.cards[0]
            console.log(`${value} of ${suit}`)
        });
    }
    catch(e){
        console.log(e)
    }
}
drawTwoCards()


/* 3 */
let deckID = null;
let $startBtn = $("#start-btn")
let $drawBtn = $("#get-card-btn")

//event listener on start button
$startBtn.on("click", startDraw)
async function startDraw(){
    $("#card-container").empty()
    let resp = await axios.get(`${baseUrl}/new/shuffle/?deck_count=1`)
    deckID = resp.data.deck_id
    $startBtn.hide()
    $drawBtn.show()
}

//event listener on draw card button
$drawBtn.on("click", drawCard)
async function drawCard(){
    let resp = await axios.get(`${baseUrl}/${deckID}/draw/?count=1`)
    let remaining = resp.data.remaining
    let image = resp.data.cards[0].images.png
    let angle = Math.random() * 90 - 50;
    let randomX = Math.random() * 50 - 20;
    let randomY = Math.random() * 50 - 20;

    $("#card-container").append(`<img src = "${image}" 
                        class= "cards"
                        style= "transform: rotate(${angle}deg) translate(${randomX}px, ${randomY}px);">`);
    $("#remaining").text(`Cards left: ${remaining}`)
    
    if (remaining === 0){
        $drawBtn.hide();
        $startBtn.text('DRAW FROM NEW DECK');
        $startBtn.show();
    }
}
