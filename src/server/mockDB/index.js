const destinations = require('./destinations')
const users = require('./users')

module.exports = db => {
  db.collection('destinations').insertMany(destinations)
  db.collection('users').insertMany(users)
}
