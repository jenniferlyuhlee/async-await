const baseUrl = 'http://numbersapi.com';

//1
let random_fact = axios.get(`${baseUrl}/15?json`)
.then(data => {
    $("#fav-num").append(`<li>${data.data.text}</li>`)
})
.catch(err => {console.log(err)});


//2
let favNums = [8, 27, 99]
let random_facts = axios.get(`${baseUrl}/${favNums}?json`)
.then(data => {
    for (let num of favNums){
        console.log(data.data[num])
        $("#fav-nums").append(`<li>${data.data[num]}</li>`)
    }
})
.catch(err => {console.log(err)});


//3
let promises=[]
for (let i=1; i<5; i++){
    promises.push(axios.get(`${baseUrl}/3?json`));
}

Promise.all(promises)
.then(arr => {
    arr.forEach(fact => $("#four-facts").append(`<li>${fact.data.text}</li>`))
})
.catch(err => {console.log(err)});