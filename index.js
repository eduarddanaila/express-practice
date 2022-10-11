const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());

const routes = require(`./routes/routes`);

app.use("/names", routes);

app.get(`/`, (req, res) => res.send("Blank"));

app.get(`/hello`, (req, res) => res.send("Hello World!"));

const logger = (req, res, next) => {
  console.log(new Date());
  next();
};

app.use(logger);

app.use((req, res, next) => {
  console.log("Date and Time");
})



app.use((err, req, res, next) => {
  console.log(err.stack);
  next(err);
})

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.message || "Terror occurred");
})

const server = app.listen(4193, () => console.log(`Server successfully started on port ${server.address().port}`));