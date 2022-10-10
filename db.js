const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/tdp_db", {
    userNewUrlParser: true
});

const newSchema = new mongoose.Schema({
    newName: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    }
});