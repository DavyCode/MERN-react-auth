'use strict'

module.exports = function (passport) {
  return {
    requireAuth : passport.authenticate('jwt', { session: false })
  }
}
