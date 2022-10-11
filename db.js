const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tdp_db", {
    useNewUrlParser: true
}).then(() => console.log("Connected to MongoDB")).catch(err => console.error(err));

const peopleSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: String,
});

const peopleModel = mongoose.model("people", peopleSchema);
module.exports = {
    peopleModel
}