import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import io from 'socket.io-client'
import auth from '@feathersjs/authentication-client'
import development from '../../config/development.json'

const srv = feathers()
const url = process.env.NODE_ENV === 'production'
  ? ''
  : `${development.host}:${development.port}`

srv.configure(socketio(io(url)))
srv.configure(auth({ path: 'auth' }))

srv.reAuthenticate()
  .catch(() => {
    srv.authentication.removeAccessToken()
  })

export default srv
