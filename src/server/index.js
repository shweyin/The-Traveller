const feathers = require('@feathersjs/feathers')
const express = require('@feathersjs/express')
const config = require('@feathersjs/configuration')
const socketio = require('@feathersjs/socketio')
const database = require('./database')
const auth = require('./auth')

const srv = express(feathers())
srv.configure(config())

// usernameField bug
srv.set('authentication', {
  ...srv.get('authentication'),
  local: {
    usernameField: 'username',
    passwordField: 'password'
  }
})

srv.configure(socketio())
database(srv)
  .then(() => srv.configure(auth))
  .catch(console.log)

srv.listen(srv.get('port'))
