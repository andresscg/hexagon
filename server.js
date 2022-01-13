require("dotenv").config()
require("./config/database")
require("./config/passport")
const express = require("express")
const cors = require("cors")
const router = require("./routes/routes")
const passport = require("passport")
const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())
app.use(passport.initialize())
app.use("/api", router)

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/dist"))
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname + "/frontend/dist/index.html"))
  })
}

app.listen(PORT, () => console.log("App listening on port " + PORT))
