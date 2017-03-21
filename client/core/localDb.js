'use strict'

const localDb = {
  jwtKey: 'jwtToken',
  userKey: 'user',

  setItem(key, value) {
    this.removeItem(key)

    return localStorage.setItem(key, value)
  },

  getItem(key, parse) {
    const item = localStorage.getItem(key)

    if (!parse || typeof item === 'object') {
      return item
    }

    try {
      return JSON.parse(item)
    } catch (err) {
      return null
    }
  },

  removeItem(key) {
    localStorage.removeItem(key)
  },

  setUser(user) {
    this.setItem(this.userKey, JSON.stringify(user))
  },

  getUser() {
    return this.getItem(this.userKey, true)
  },

  deleteUser() {
    this.removeItem(this.userKey)
  },

  setJwt(jwt) {
    this.setItem(this.jwtKey, jwt)
  },

  getJwt() {
    return this.getItem(this.jwtKey)
  },

  deleteJwt() {
    this.removeItem(this.jwtKey)
  }
}

export default localDb
