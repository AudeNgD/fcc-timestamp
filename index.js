// index.js
// where your node app starts

const moment = require("moment");

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

//An empty date parameter should return the current time in a JSON object with a unix key and a utc key
app.get("/api", (req, res) => {
  const date = new Date();
  const utc_date = moment(date).format("dd, Do MMM YYYY HH:mm:ss GMT");
  res.json({ unix: Date.now(), utc: utc_date });
});

//return the current time in a JSON object with a unix key and a utc key when passed valid date
app.get("/api/:date", (req, res) => {
  const date = req.params.date;
  console.log(date);
  !isNaN(new Date(date))
    ? res.json({
        unix: Date.parse(date),
        utc: moment(date).format("dd, Do MMM YYYY HH:mm:ss GMT"),
      })
    : res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
