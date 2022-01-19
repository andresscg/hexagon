require("dotenv").config()
require("./config/database")
require("./config/passport")

const fs = require("fs")
const express = require("express")
const path = require("path")
const cors = require("cors")
const router = require("./routes/routes")
const passport = require("passport")
const compression = require("compression")
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use("/api", router)
app.use(compression())
app.use(express.static(__dirname + '/images'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/build/index.html"))
  })
}

app.listen(PORT, () => console.log("App listening on port " + PORT))
