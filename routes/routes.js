const router = require("express").Router();
const { peopleModel } = require("../db");

//router.get("/getAllNames", (req, res) => namesModel.find({}).then(results => res.send(results)).catch(err => next(err)));
//const names = ["ED", "DM", "GI", "RP", "SM", "DH"];


router.get(`/getAll`, (req, res) => peopleModel.find({}).then(results => res.send(results)).catch(err => next(err)));

router.get(`/get/:id`, (req, res, next) => {
    const { id } = req.params;
    peopleModel.findById(id)
});

const deleteMiddleware = (req, res, next) => {
    console.log("deleting input");
    next();
}

router.delete("/delete/:id", deleteMiddleware, (req, res, next) => {
    const { id } = req.params;
    console.log("ID:", id);
    peopleModel.findByIdAndDelete(id).then(result => res.send(result)).catch(err => next(err));
});

router.post("/create", async (req, res, next) => {
    if (!req.body.name) return next({ status: 400, message: "New name not provided" });
    try {
        const result = await peopleModel.create(req.body);
        res.status(201).send(result);
    } catch (err) {
        return next(err);
    }
});

router.patch("/update/:id", async (req, res, next) => {
    try {
        await peopleModel.findByIdAndUpdate(req.params.id, req.query)
        const newName = await peopleModel.findById(req.params.id);
        res.send(newName);
    } catch (err) {
        return next(err);
    }
});

module.exports = router;