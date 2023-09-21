const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT
const { MongoClient, ServerApiVersion } = require('mongodb');
// -------------------------------------
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vst2gce.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    const booksCollection =  client.db("booknet-simple").collection('books');
    console.log("successfully connected to MongoDB!");

    

  } finally {
   
    await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})