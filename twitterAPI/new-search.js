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

        console.log(user, body);

        let searchDetails = {
            q: body.search_term,
            result_type: body.result_type,
            count: 200,
        };

        if(body.latitude && body.longitude && body.radius){
            searchDetails.geocode = `${body.latitude},${body.longigute},${body.radius}`;
        }
        if(body.language){
            searchDetails.language =  body.language
        }

        console.log(searchDetails)

        client
        .get("search/tweets", searchDetails)
        .then((response) => {
            console.log(response);

            resolve(response)
        })
        .catch(err => console.log(err));
    })
}

module.exports = start;