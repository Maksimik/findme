'use strict'

export default {
  user: {},
  authenticated: false,
  jwt: '',

  getJwt() {
    return this.jwt
  },

  setJwt(jwt) {
    this.jwt = jwt
  },

  removeJwt() {
    this.jwt = null
  },

  setUser(user) {
    this.authenticated = true
    this.user = user
  },

  removeUser() {
    this.authenticated = false
    this.user = null
  }
}
