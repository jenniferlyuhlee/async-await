const baseUrl = 'http://numbersapi.com';

//1
async function random_fact(){
    try{
        let resp = await axios.get(`${baseUrl}/15?json`);
        let fact = resp.data.text
        $("#fav-num").append(`<li>${fact}</li>`)
    }
    catch(e){
        $("#fav-num").append(e)
    }
}
random_fact()


//2
async function random_facts(nums){
    try{
        let resp = await axios.get(`${baseUrl}/${nums}?json`)
        let facts = resp.data
        for (let num of nums){
            $("#fav-nums").append(`<li>${facts[num]}</li>`)
        }
    }
    catch(e){
        $("#fav-nums").append(e)
    }
}
random_facts([8, 27, 99])


//3
async function four_facts(){
    try{
        let facts = await Promise.all([
            axios.get(`${baseUrl}/3?json`),
            axios.get(`${baseUrl}/3?json`),
            axios.get(`${baseUrl}/3?json`),
            axios.get(`${baseUrl}/3?json`)
        ]);
    
        facts.forEach(data => {
            $("#four-facts").append(`<li>${data.data.text}</li>`)
            })
    }
    catch(e){
        $("#four-facts").append(e)
    }

}
four_facts()
