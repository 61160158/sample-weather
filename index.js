const MongoClient = require('mongodb').MongoClient
const express = require('express')

const app = express()
const url = 'mongodb+srv://superadmin:B72D994E@cluster0.uhmzt.mongodb.net/sample_weatherdata?retryWrites=true&w=majority'
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true })

async function connect() {
    await client.connect()
}
connect()

app.get('/weather', async (req, res) => {
    try {
        const callLetters = req.query.callLetters
        const db = client.db('sample_weatherdata')
        const collection = db.collection('data')
        let query = {}
        if (callLetters){
            query.callLetters = callLetters
        }
        const cursor = collection.find(query)
        let data = []
        await cursor.forEach(doc => data.push(doc.position , doc.callLetters , doc.airTemperature , doc.ts))
        res.send(data)
    }
    catch(e) {
        console.log(e)
    }
})

app.listen(3000, console.log('Start application at port 3000'))