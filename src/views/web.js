import express from "express"
import MongGoDB from '../controller/homeController'
let router = express.Router()
require("dotenv").config();
const initWebRoute = (app) => {
    router.get('/v/view',  MongGoDB.viewAllData )
    router.post('/v/check-and-update-quantity', MongGoDB.checkQuantity )
    router.post('/v/login', MongGoDB.Login )
    router.post('/v/check-user', MongGoDB.checkUser )
    router.post('/v/check-order', MongGoDB.ReceivePurchaseOrder )
    return app.use('/', router)
}
export default initWebRoute;

