const mongoose = require("mongoose")

const url = "mongodb+srv://mongodb:dhanashri@cluster0.qdytt.mongodb.net/Program?retryWrites=true&w=majority"

mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true })
    .then(response => console.log("Connected to database successfully"))
    .catch(error => console.log("Error while connecting", error))

module.exports = mongoose