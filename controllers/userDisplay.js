
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
        console.log(tweetsList.statuses)
        let idArray = [];
        tweetsList.statuses.forEach(element => {
            idArray.push(element.id_str);
        });
        res.render(
            process.cwd() + "/views/search-results/search-results.ejs",
            { data: idArray }
        );
    }

}

module.exports = userController;