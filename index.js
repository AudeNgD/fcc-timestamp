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
  const utc_date = moment.utc(date).format("ddd, D MMM YYYY HH:mm:ss [GMT]");
  res.json({ unix: Number(date), utc: utc_date.toString() });
});

//return the current time in a JSON object with a unix key and a utc key when passed valid date
app.get("/api/:date", (req, res) => {
  let date = req.params.date;

  //case when date is unix timestamp
  if (date.match(/\d{13}/)) {
    date = date * 1000;
    // check if date is valid
    if (!isNaN(new Date(date))) {
      return res.json({
        unix: Number(date / 1000),
        utc: moment
          .utc(date / 1000)
          .format("ddd, DD MMM YYYY HH:mm:ss [GMT]")
          .toString(),
      });
    }
  }

  // case date is /:date
  // check if date is valid
  if (!isNaN(new Date(date))) {
    const valid_date = Date.parse(date);
    return res.json({
      unix: Number(valid_date),
      utc: moment
        .utc(valid_date)
        .format("ddd, DD MMM YYYY HH:mm:ss [GMT]")
        .toString(),
    });
  }
  // case when date is invalid
  res.json({ error: "Invalid Date" });
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
