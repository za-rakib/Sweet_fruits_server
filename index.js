const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()
const port =process.env.PORT ||5000;


app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Welcome to Sweet Fruits Server!!')
})



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqlov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const fruitCollection = client.db("sweet-fruits").collection("fruits");

  app.get('/fruits', (req, res) => {
     fruitCollection.find()
     .toArray((err,items) =>{
       res.send(items)
     })
  })

 app.post('/addFruits', (req, res) => {
 const newEvent =req.body;

 console.log("adding new fruits",newEvent);
 fruitCollection.insertOne(newEvent)
 .then(result=>{
   console.log("inserted Count",result.insertedCount);
   res.send(result.insertedCount>0)
 })
 })
//   client.close();
});

app.listen(process.env.PORT || port)