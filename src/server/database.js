const { MongoMemoryServer } = require('mongodb-memory-server')
const MongoClient = require('mongodb').MongoClient
const service = require('feathers-mongodb')
const mockDB = require('./mockDB')

module.exports = async app => {
  const dev = process.env.NODE_ENV === 'development'
  const dbName = app.get('dbName')

  // run dev mongodb server
  const mongod = new MongoMemoryServer({
    instance: { dbName }
  })

  //const uri = dev ? await mongod.getConnectionString() : app.get('dbURI')
  const uri = await mongod.getConnectionString()
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  const db = client.db(dbName)
  const whitelist = ['$all']
  const collections = [
    'destinations',
    'users',
    'trips'
  ]

  collections.forEach(e => {
    const Model = db.collection(e)
    app.use(`${e}`, service({ Model, whitelist }))
  })

  // setup mock data in development
  dev && mockDB(db)
}
