const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, BSON } = require('mongodb');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
const port = process.env.PORT
// -------------------------------------
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.vst2gce.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
client.connect();

async function run() {
  try {

    const db = client.db('booknet-simple');
    const booksCollection = db.collection('books');

    app.get('/books', async (req, res) => {
      const result = await booksCollection.find({}).toArray();
      res.send(result);
    });

    app.get('/books/:id', async (req, res) => {
      const { id } = req.params;
      // console.log(id);

      const result = await booksCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.post('/books', async (req, res) => {
      const data = req.body;
      const result = await booksCollection.insertOne(data);
      res.send({ result });
    });

    app.post('/books/:id', async (req, res) => {
      const data = req.body;
      const { id } = req.params;
      const result = await booksCollection.updateOne({ _id: new ObjectId(id) }, { $set: data });
      res.send({ result });
    });

  } finally {


  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})