
function userController() {

    this.displayProfile = async function(req,res){
        res.render(
            process.cwd() + "/views/user-profile/user-profile.ejs",
            { data: req.user }
          );
    }

    this.newSearch = async function(req,res){
        console.log("inside new search")
        const twitterNewSearch = require("../twitterAPI/new-search");
        let tweetsList = await twitterNewSearch(req.user, req.body);
        let idArray = [];
        tweetsList.statuses.forEach(element => {
            idArray.push(element.id_str);
        });

        let searchDetails = {
            q: req.body.search_term,
            result_type: req.body.result_type,
            count: 200,
        };

        if(req.body.latitude && req.body.longitude && req.body.radius){
            searchDetails.geocode = `${req.body.latitude},${req.body.longigute},${req.body.radius}`;
        }
        if(req.body.language){
            searchDetails.language =  req.body.language
        }


        res.render(
            process.cwd() + "/views/search-results/search-results.ejs",
            { data: idArray }
        );
    }

}

module.exports = userController;