const UserDisplay = require("../controllers/userDisplay");

const passport = require('passport');

function router(app) {
  
  const userDisplay = new UserDisplay;

  app.route("/").get((req, res) => res.sendFile(process.cwd() + "/main.html"));

  app.route("/:twitter_handle").get(ensureAuthenticated, userDisplay.displayProfile);

  app.route("/:twitter_handle/searchresults").post(ensureAuthenticated, userDisplay.newSearch);

  app
    .route("/login/twitter")
    .get(passport.authenticate('twitter'), (req) => {
      console.log("Req here:", req);
    });

  app
    .route("/login/twitter/callback")
    .get(passport.authenticate('twitter', {failureRedirect : "/"}), (req,res) => {
      res.redirect(`/${req.user.twitterHandle}`);
    })

  app
    .route("/:user/logout")
    .get((req,res) => {
      req.logout();
      res.redirect('/');
    })

}

module.exports = router;

function ensureAuthenticated(req,res,next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}