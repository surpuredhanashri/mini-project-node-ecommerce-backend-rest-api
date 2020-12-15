const router = require("express").Router()
const Order = require("../model/Order")
const ObjectId = require("mongoose").Types.ObjectId


router.route("/")
    .get((req, res) => {

        Order.find((err, orders) => {
            if (err) res.send("Error! PLease try again later!")
            else {
                if (orders.length > 0) res.send(orders)
                else res.send("Please add some orders before fetching!")
            }
        })
    })
    .post((req, res) => {

        if (req.body.product && req.body.quantity) {
            const newOrder = new Order({
                product: req.body.product,
                quantity: req.body.quantity
            })

            newOrder.save((err, response) => {
                if (err) res.send("Error! PLease try again later!")
                else {
                    res.json({ Placed_new_order: response })
                }
            })
        }
        else res.send("Product id and quantity both fields required before saving!")
    })


router.route("/:id")
    .get((req, res) => {

        const id = req.params.id

        if (!ObjectId.isValid(id)) res.send("Invalid Id ! Please try again with valid id!")
        else {

            Order.find({ "_id": id }, (err, order) => {
                if (err) res.send("Error! Please try again later!")
                else {
                    if (order) res.send(order)
                    else res.json({ message: "Order doesnt exist for requested id!" })
                }
            })
        }
    })
    .put((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.send("Invalid Id ! Please try again with valid id!")
        if (req.body.product && req.body.quantity) {

            const newOrder = {
                product: req.body.product,
                quantity: req.body.quantity
            }

            Order.updateOne({ "_id": id }, newOrder, (err, response) => {
                if (err) res.send("Error! Please try again later!")
                else if (response.nModified) res.redirect(`/orders/${id}`)
                else if (response.n == 0) res.json({ message: "Order doesnt exist for requested id!" })
                else res.json({ message: 'New data was same as old data!' })
            })
        }
        else res.send("Product id and quantity both fields are required for update!")
    })
    .delete((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.send("Invalid Id ! Please try again with valid id!")
        else {
            Order.deleteOne({ "_id": id }, (err, response) => {
                if (err) res.send("Error! Please try again later!")
                else if (response.deletedCount) res.send("Order was deleted successfully")
                else if (response.n === 0) res.json({ message: "Order doesnt exist for requested id!" })
            })
        }
    })




module.exports = router