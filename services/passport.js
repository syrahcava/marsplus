const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

// const mongoose = require("mongoose")
//
// const keys = require("../config/keys")
//
// const User = mongoose.model("users")
//
// passport.serializeUser((user, done) => {
//   done(null, user.id)
// })
//
// passport.deserializeUser((id, done) => {
//   User.findById(id).then(user => {
//     done(null, user)
//   })
// })
//
// passport.use(new GoogleStrategy({
//   clientID: keys.googleClientID,
//   clientSecret: keys.googleClientSecret,
//   callbackURL: "/auth/google/callback",
//   proxy: true
// }, async (accessToken, refreshToken, profile, done) => {
//   const existingUser = await User.findOne({googleId: profile.id})
//   if (existingUser) {
//     return done(null, existingUser)
//   }
//   const user = await new User({googleId: profile.id}).save()
//   done(null, user)
// }))


const opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader('authorization');
opts.secretOrKey = 'sdewdw45TU@dw443ff@@!g';
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
  // TODO: 添加对于用户信息的处理逻辑
  return done(null, true);
  // User.findOne({id: jwt_payload.sub}, function(err, user) {
  //     if (err) {
  //         return done(err, false);
  //     }
  //     if (user) {
  //         return done(null, user);
  //     } else {
  //         return done(null, false);
  //         // or you could create a new account
  //     }
  // });
}));
