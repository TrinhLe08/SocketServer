import CRUD from "./CRUD.js";
import jwt from "jsonwebtoken";
const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();


// 1. Import data to mongoDB. (1 Point)

const dbName = process.env.DATABASE_USER_NAME;

// User
const urlUser = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.PASSWORD_DATABASE}@cluster0.mrz3qxp.mongodb.net/${process.env.DATABASE_USER_NAME}?retryWrites=true&w=majority`;
const clientUser = new MongoClient(urlUser);
const DBUser = clientUser.db(dbName);
const dataUser = process.env.DATABASE_TEST_USERS;

// Inventory
const urlInventory = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.PASSWORD_DATABASE}@cluster0.mrz3qxp.mongodb.net/${process.env.DATABASE_USER_NAME}?retryWrites=true&w=majority`;
const clientInventory = new MongoClient(urlInventory);
const DBInventory = clientInventory.db(dbName);
const dataInventory = process.env.DATABASE_TEST_Inventory;


// Order
const urlOrder = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.PASSWORD_DATABASE}@cluster0.mrz3qxp.mongodb.net/${process.env.DATABASE_USER_NAME}?retryWrites=true&w=majority`;
const clientOrder = new MongoClient(urlOrder);
const DBOrder = clientOrder.db(dbName);
const dataOrder = process.env.DATABASE_TEST_Order;


// 2. Write an api endpoint for that getting all products in inventory. (3 Points)
const viewAllData = async (req, res) => {
  const myData = await CRUD.viewData(DBInventory, dataInventory)
  return res.send({myData})
}

// 3. Update the API to accept a query for getting only products that have low quantity (less than 100). (2 Points)
const checkQuantity = async (req, res) => {
  console.log(req.body.id, 39);
  try {
    // Middware check Id
    if(req.body.id == undefined) {
     return res.send({message: 'Invalid value !'})
    }
    const Id = req.body.id
    const myData = await CRUD.findById(DBInventory, dataInventory, Id)
    if(myData.instock && myData.instock > 100){
      return res.send({message: 'Products with Quantities Greater than 100'})
    }
    // CheckUpdate
    if(myData) {
      return res.send({myData})
    } else {
      return res.send({message: 'Failed !'})
    }
  } catch(err) {
    console.log(err);
  }
}
// 4. Create a login API. Generate a token when user get login. (2 Points)
const Login = async (req, res) => {
  console.log(req.body);
  // Middware 
  if(!req.body.username || !req.body.password) {
   return res.send({message: 'Not enough information !'})
  }
  // Check User By Name
  const user = await CRUD.findOneName(DBUser, dataUser, req.body.usename);
  console.log(user, 69);
  if (!user) {
    return res.status(404).json({ message: "Password it wrong" });
    // Check password
  } else if (user.password == req.body.password) {
    // Token
    const token = jwt.sign(
      { username: user.username, password: user.password },
      process.env.KEY_JWT
    );
    delete user.password
    return res.send({token, user })
}
}

// 5. Restrict the resource. Only logged-in user can visit it. (1 Points)
const checkUser = async (req, res) => {
  // Middware
  if(!req.body.token ){
  return res.status(403).send({message: 'Faile'})
  }
  const userToken = req.body.token
  const secretKey = process.env.KEY_JWT
  // Check
jwt.verify(userToken, secretKey, (err, decoded) => {
  if (err) {
    return res.status(403).send({message: 'Faile'})
  } else {
    return res.status(200).send({message: 'Success'})
  }
});
}

// 6. Create an API for getting orders with the description of product inside each orders. (1 Points)
const ReceivePurchaseOrder = async (req, res) => {
  // Middware 
  if(!req.body.idOfOrder){
    return res.status(403).send({message: 'Faile'})
  }
  const idOfOrder = req.body.idOfOrder
  const Other = await CRUD.findById(DBOrder, dataOrder, idOfOrder)

  if(Other){
    return res.status(200).send({Other})
  } else {
    return res.status(201).send({message : 'Order does not exist !'})

  }
}

module.exports = {
  viewAllData,
  checkQuantity,
  Login,
  checkUser,
  ReceivePurchaseOrder
};
