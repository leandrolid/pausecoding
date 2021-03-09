import { VercelRequest, VercelResponse } from '@vercel/node' 
import { MongoClient, Db } from 'mongodb'
import url from 'url'

let cachedDb: Db = null

async function connectToDatabase(uri: string){

    if (cachedDb) {
        return cachedDb
    }

    const client = await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

    const dbName = url. parse(uri).pathname.substr(1)

    const db = client.db(dbName)
    
    cachedDb = db

    return db;
}

export default async ( request: VercelRequest , response: VercelResponse ) => {

    const { username } = request.body

    const db = await connectToDatabase(process.env.MONGO_URI)

    const collection = db.collection('users')

    let user = await collection.findOne({username})

    //console.log({username})

    if (!user) {
        let userExists = await collection.insertOne({
            username,
            date: new Date
        })
        return userExists
    }

    return response.json({ user })
}