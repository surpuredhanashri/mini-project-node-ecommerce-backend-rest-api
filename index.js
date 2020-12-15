const express = require('express')
const app = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const productRouter = require("./controller/ProductRoutes")
const orderRoutes = require("./controller/OrderRoutes")
const userRoutes = require("./controller/UserRoutes")

app.use(bodyParser.json())
app.use(cors({ origin: '*' }))

app.use("/products", productRouter)
app.use("/orders", orderRoutes)
app.use("/user", userRoutes)

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(3000, () => console.log(`App listening on port 3000!`))