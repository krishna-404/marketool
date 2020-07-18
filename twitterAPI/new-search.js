const Twitter = require('twitter-lite');

function start(user, body){
    console.log("Calling twitter");
    return new Promise((resolve, reject) => {
        console.log("inside twitterAPI")
        const client = new Twitter({
        subdomain: "api", // "api" is the default (change for other subdomains)
        version: "1.1", // version "1.1" is the default (change for other subdomains)
        consumer_key: process.env.twitter_API_key,
        consumer_secret: process.env.twitter_API_secret_key,
        access_token_key: user.twitterOAuthToken,
        access_token_secret: user.twitterOAuthTokenSecret
        });

        let city = {
            India: "23.473324,77.947998,2500km",
            Bengaluru: "12.972442,77.580643,1000km",
            Mumbai:"19.076090,72.877426,1000km",
            Pune: "18.516726,73.856255,1000km",
            Delhi_NCR: "28.610001,77.230003,1000km",
            Hyderabad: "17.387140,78.491684,1000km",
            Chennai: "13.067439,80.237617,1000km"
        }

        let searchDetails = {
            q: body.search_term,
            result_type: body.result_type,
            count: 200,
        };
        console.log(body.city, city[body.city]);
        if(body.city != "Any"){
            searchDetails.geocode = city[body.city]
        }
        if(body.language){
            searchDetails.language =  body.language
        }

        console.log(searchDetails)

        client
        .get("search/tweets", searchDetails)
        .then((response) => {
            resolve(response)
        })
        .catch(err => console.log(err));
    })
}

module.exports = start;