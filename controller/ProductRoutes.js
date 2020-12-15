const router = require("express").Router()
const Product = require("../model/Product")
const ObjectId = require("mongoose").Types.ObjectId

router.route("/")
    .get((req, res) => {

        Product.find((err, products) => {
            if (err) res.send("Error while fecthing products please try again later")
            else {
                if (products.length > 0) res.send(products)
                else res.send("Products data is empty. Please add some products")
            }
        })
    })
    .post((req, res) => {

        if (req.body.name && req.body.price && req.body.productImage) {

            const product = new Product({
                name: req.body.name,
                price: req.body.price,
                productImage: req.body.productImage
            })

            product.save((err, response) => {
                if (err) res.send("Error while saving data. Please try again later!")
                else res.status(200).json({ Added_New_Product: response })
            })
        }
        else res.send("Name, Price, Image cannot be empty!")
    })


router.route("/:id")
    .get((req, res) => {
        const id = req.params.id

        if (ObjectId.isValid(id)) {
            Product.findOne({ "_id": id }, (err, product) => {
                if (err) res.send("Error! Please try again later")
                else {
                    if (product) res.send(product)
                    else res.send("Sorry! But product with given id doesnt exist yet!")
                }
            })
        }
        else res.send("Please enter valid id")
    })
    .put((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.send("Please enter valid id")
        else {
            if (req.body.name && req.body.price && req.body.productImage) {

                const newProduct = {
                    name: req.body.name,
                    price: req.body.price,
                    productImage: req.body.productImage
                }

                Product.updateOne({ "_id": id }, newProduct, (err, response) => {
                    if (err) res.send("Error! Please try again later")
                    else {
                        if (response.nModified) res.redirect(`/products/${id}`)
                        else if (response.n == 0) res.send("No product found!")
                        else res.send("New data was same as previous one!")
                    }
                })
            }
            else res.send("Name, Price, Image cannot be empty!")
        }

    })
    .delete((req, res) => {
        const id = req.params.id

        if (!ObjectId.isValid(id)) res.send("Please enter valid id")
        else {
            Product.deleteOne({ "_id": id }, (err, response) => {

                if (err) res.send("Error! Please ty again later!")
                else {
                    if (response.deletedCount) res.send("Data was deleted successfully")
                    else if (response.n === 0) res.send("No Data found for specified Id")
                }
            })
        }
    })


module.exports = router