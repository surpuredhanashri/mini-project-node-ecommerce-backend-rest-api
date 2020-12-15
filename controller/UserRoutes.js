const router = require("express").Router()
const User = require("../model/User")
const bcrypt = require('bcrypt');
const saltRounds = 10;


router.route("/")
    .get((req, res) => {


        if (req.body.email && req.body.password) {

            const email = req.body.email
            const password = req.body.password

            let verifyPassword = null

            User.findOne({ "email": email })
                .then(user => {

                    if (user) {
                        verifyPassword = user.password
                        console.log(bcrypt.compareSync(password, verifyPassword));
                        if (verifyPassword) {
                            if (bcrypt.compareSync(password, verifyPassword))
                                res.send("Login Successful")
                            else res.send("Incorrect Password!")
                        }
                        else res.send("error")
                    }
                    else res.send("User doesn't exist for requested email id!")

                })
                .catch(err => res.send("Please try again later"))
        }
        else res.send("Email and password both required!")
    })
    .post((req, res) => {

        if (req.body.email && req.body.password) {

            const user = new User({
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, saltRounds)
            })

            user.save((err, user) => {
                if (err) res.send("Please try again later")
                else res.json({ New_User: user })
            })
        }
        else res.send("Email and password both required!")
    })


module.exports = router