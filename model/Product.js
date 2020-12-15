const mongoose = require("../connection/connection")


const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    productImage: { type: String }
})

module.exports = mongoose.model("products", ProductSchema)