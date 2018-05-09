const passport = require("passport")

module.exports = app => {
  // app.get("/auth/google", passport.authenticate("google", {
  //   scope: ["profile", "email"]
  // }))
  //
  // app.get("/auth/google/callback", passport.authenticate("google"), (req, res) => {
  //   res.redirect("/surveys")
  // })
  //
  // app.get("/api/logout", (req, res) => {
  //   req.logout()
  //   res.redirect("/surveys")
  // })

  app.get("/api/currentUser", passport.authenticate('jwt', { session: false }), (req, res) => {
    res.send({
      name: 'admin',
      avatar: 'avatar.png',
      userid: '00000001',
    })
  })
}
