const express = require("express")
const mongoose = require("mongoose")
const cookieSession = require("cookie-session")
const passport = require("passport")
const bodyParser = require("body-parser")

const keys = require("./config/keys")

// require("./models/User")
// require("./models/Survey")
// require("./services/passport")

// mongoose.connect(keys.mongoURI)

const app = express()

app.use(bodyParser.json())
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    keys: [keys.cookieKey]
  })
)
app.use(passport.initialize())
app.use(passport.session())

require("./routes/authRoutes")(app)
require("./routes/operationRoutes")(app)
require('./routes/customerRoutes')(app)

if(process.env.NODE_ENV === "production"){
  // Express will serve up production assets
  app.use(express.static("client/dist"))
  // Express will serve up  the index.html file if it doesn't recognize the route
  const path = require("path")
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  })
}

const PORT = process.env.PORT || 5000
app.listen(PORT, "0.0.0.0")
