const router = require(`express`).Router();
//const { nameModel } = require("../db");

//router.get("/getAllNames", (req, res) => namesModel.find({}).then(results => res.send(results)).catch(err => next(err)));
let names = ["ED", "DM", "GI", "RP", "SM", "DH"];

router.get(`/`, (req, res) => res.send("Hello World!"));

router.get(`/getAll`, (req, res) => res.send(names));

router.get(`/get/:id`, (req, res) => res.send(names[req.params.id]));

router.delete(`/delete/:id`, (req, res) => {
    res.send(names.splice(req.params.id, 1));
});

router.post("/create", (req, res,next) => {
    const name = req.body.name;
    if (!req.body.name) return next({ status: 400, message: "New name not provided" });
    names.push(req.body.name);
    res.status(201).send(names[names.length -1]);
});

router.put(`/replace/:id`, (req, res) => {
    const name = req.query.name;
    const index = req.params.id;
    const old = names[index];
    names[req.params.id] = name;
    res.status(202).send(`${old} successfully replaced with ${name}`);
});

module.exports = router;