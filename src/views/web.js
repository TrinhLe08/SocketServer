import express from "express"
import MongGoDB from '../controller/homeController'
let router = express.Router()
require("dotenv").config();
const initWebRoute = (app) => {
    router.get('/v/view',  MongGoDB.viewAllData )
    router.get('/v/check-and-update-quantity', MongGoDB.checkQuantity )
    router.get('/v/login', MongGoDB.Login )
    router.get('/v/check-user', MongGoDB.checkUser )
    router.get('/v/check-order', MongGoDB.checkQuantity )
    return app.use('/', router)
}
export default initWebRoute;

