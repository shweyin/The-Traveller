const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication')
const { LocalStrategy } = require('@feathersjs/authentication-local')
const { NotAuthenticated } = require('@feathersjs/errors')

class LocalStrat extends LocalStrategy {
  comparePassword (entity, password) {
    if (entity.password === password)
      return entity
    else
      throw new NotAuthenticated(this.configuration.errorMessage)
  }
}

module.exports = app => {
  const authService = new AuthenticationService(app)

  authService.register('jwt', new JWTStrategy())
  authService.register('local', new LocalStrat())

  app.use('auth', authService)
}
