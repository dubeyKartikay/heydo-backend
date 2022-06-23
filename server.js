const  { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://heydo:TlsxfCRro7eQagYW@cluster0.qgxvc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
var cors = require('cors');
const { response } = require('express');
async function insertToDB(data){
    const conn = await client.connect();
    const collection = client.db("heydo").collection("userdata");
    let res = "NULL";
    try {
     res = await collection.insertOne(data);
    console.log(res);
    
    } catch (error) {
     res = "Error";
    }
    client.close();
    return res;
}
app.use(cors()) // Use this after the variable declaration
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// add router in the Express app.
app.use("/", router);
router.post('/create',(request,response) => {
    // console.log(request.body);
    //code to perform particular action.
    //To access POST variable use req.body()methods.
    // console.log("HERE");
  insertToDB(request.body).then(
    (res)=>{
        if (res === "Error" || res === "NULL") {
            response.sendStatus(500);
        }else{
            response.sendStatus(200);
        }
    }
  )
    
    });
router.get('/',(req,res)=>{
    console.log("invalidURL");
})

    
app.listen(process.env.PORT||3001,() => {
    console.log("Started on PORT 3001");
    })