const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());


app.get(`/`, (req, res) => res.send("Hello World!"));

let names = ["ED", "DM", "GI", "RP", "SM", "DH"];

app.get(`/getAll`, (req, res) => res.send(names));

app.get(`/get/:id`, (req, res) => res.send(names[req.params.id]));

app.delete(`/delete/:id`, (req, res) => {
    res.send(names.splice(req.params.id, 1));
});

app.post("/create", (req, res,next) => {
    const name = req.body.name;
    if (!req.body.name) return next({ status: 400, message: "New name not provided" });
    names.push(req.body.name);
    res.status(201).send(names[names.length -1]);
});

app.put(`/replace/:id`, (req, res) => {
    const name = req.query.name;
    const index = req.params.id;
    const old = names[index];
    names[req.params.id] = name;
    res.status(202).send(`${old} successfully replaced with ${name}`);
})

//const logger = (req, res, next) => {
//    console.log(new Date());
//    next();
//}

//app.use(logger);

//app.use((req, res, next) => {
//console.log("heya");
//})



app.use((err, req, res, next) => {
    console.log(err.stack);
    next(err);
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.message || "Terror occurred");
})

const server = app.listen(4193, () => console.log("hi"));