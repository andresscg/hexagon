require("dotenv").config()
require("./config/database")
require("./config/passport")

const fs = require("fs")
const spdy = require("spdy")
const express = require("express")
const path = require("path")
const cors = require("cors")
const router = require("./routes/routes")
const passport = require("passport")
const compression = require("compression")
const app = express()
const PORT = process.env.PORT || 4000

const options = {
  key: fs.readFileSync(__dirname + "/server.key"),
  cert: fs.readFileSync(__dirname + "/server.crt"),
}
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use("/api", router)
app.use(compression())

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"))
  })
}

spdy.createServer(options, app).listen(PORT, (error) => {
  if (error) {
    console.error(error)
    return process.exit(1)
  } else {
    console.log("Listening on port: " + PORT + ".")
  }
})

/* app.listen(PORT, () => console.log("App listening on port " + PORT)) */
