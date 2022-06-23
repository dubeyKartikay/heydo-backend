const  { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://heydo:TlsxfCRro7eQagYW@cluster0.qgxvc.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const app = express();
var cors = require('cors')
async function insertToDB(data){
    const conn = await client.connect();
    const collection = client.db("heydo").collection("userdata");
    const response = await collection.insertOne(data);
    console.log(response);
    client.close();
}
app.use(cors()) // Use this after the variable declaration
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// add router in the Express app.
app.use("/", router);
router.post('/create',(request,response) => {
    print(request.body);
    //code to perform particular action.
    //To access POST variable use req.body()methods.
        insertToDB(request.body);
        response.send("OK");
    
    });
    
app.listen(3001,() => {
    console.log("Started on PORT 3001");
    })