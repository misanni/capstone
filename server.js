const express = require("express")
const mongoose = require('mongoose')
const session = require("express-session");
const morgan = require("morgan")
const colors = require("colors")
const connectDB = require("./config/db")
const { errorHandler } = require("./middleware/errorMiddleware")
const dotenev = require('dotenv').config();
const port = process.env.PORT || 5000
var cors = require('cors')
connectDB()
const app = express();
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(morgan('tiny'))

var allowlist = ['http://localhost:3000', 'https://goalapp.netlify.app']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use('/api',cors(corsOptionsDelegate), require("./routes/goalRoutes"))

app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`listening to ${port}`)
});