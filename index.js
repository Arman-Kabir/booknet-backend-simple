const express = require('express')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId, BSON } = require('mongodb');
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors())
app.use(express.json())
app.use(bodyParser.json());
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
      try {
        const result = await booksCollection.find({}).toArray();
        res.send(result);
      } catch (error) {
        res.send({ error })
      }
    });

    app.get('/books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        // console.log(id);
        const result = await booksCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
      } catch (error) {
        res.send({ error })
      }
    });

    app.post('/books', async (req, res) => {
      try {
        const data = req.body;
        const result = await booksCollection.insertOne(data);
        res.send({ result });
      } catch (error) {
        res.send({ error })
      }
    });

    app.patch('/comment/:id', async (req, res) => {
      try {
        const data = req.body;
        const { id } = req.params;
        // console.log(id, data);
        const result = await booksCollection.updateOne({ _id: new ObjectId(id) }, { $push: { reviews: data.review } });
        res.send({ result });
      } catch (error) {
        res.send({ error })
      }
    });

    app.post('/books/:id', async (req, res) => {
      try {
        const data = req.body;
        const { id } = req.params;
        console.log(data, id);
        const result = await booksCollection.updateOne({ _id: new ObjectId(id) }, { $set: data });
        res.send({ result });
      } catch (error) {
        res.send({ error })
      }
    });

    app.delete('/books/:id', async (req, res) => {
      try {
        const { id } = req.params;
        console.log(id);
        const result = await booksCollection.deleteOne({ _id: new ObjectId(id) });
        res.send({ result });
      } catch (error) {
        res.send({ error })
      }
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