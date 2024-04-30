const baseUrl = "https://deckofcardsapi.com/api/deck"

/* 1 */
axios.get(`${baseUrl}/new/draw/?count=1`)
.then(data => {
    let value = data.data.cards[0].value
    let suit = data.data.cards[0].suit
    console.log(`${value} of ${suit}`)
})
.catch(err => {console.log(err)});


/* 2 */
axios.get(`${baseUrl}/new/draw/?count=1`)
.then(data => {
    let value = data.data.cards[0].value
    let suit = data.data.cards[0].suit
    console.log(`${value} of ${suit}`)
    const deckId = data.data.deck_id
    return axios.get(`${baseUrl}/${deckId}/draw/?count=1`)
})
.then(data => {
    let value = data.data.cards[0].value
    let suit = data.data.cards[0].suit
    console.log(`${value} of ${suit}`)
})
.catch(err => {console.log(err)});


/* 3 */
let deckID = null;
let $startBtn = $("#start-btn")
let $drawBtn = $("#get-card-btn")

//event listener on start button
$startBtn.on("click", startDraw)
function startDraw(){
    $("#card-container").empty()
    axios.get(`${baseUrl}/new/shuffle/?deck_count=1`)
    .then(data => {
        deckID = data.data.deck_id
    })
    $startBtn.hide()
    $drawBtn.show()
}

//event listener on draw card button
$drawBtn.on("click", drawCard)
function drawCard(){
    axios.get(`${baseUrl}/${deckID}/draw/?count=1`)
    .then(data => {
        let remaining = data.data.remaining
        let image = data.data.cards[0].images.png
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
    });
}

