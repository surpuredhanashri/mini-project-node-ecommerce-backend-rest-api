const mongoose = require("../connection/connection")


const OrderSchema = new mongoose.Schema({
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1 }
})

module.exports = mongoose.model("orders", OrderSchema)