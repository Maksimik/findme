'use strict'

const localDb = {
  jwtKey: 'jwtToken',
  userKey: 'user',

  setItem(key, value) {
    this.removeItem(key)

    return new Promise(resolve => {
      const item = localStorage.setItem(key, value)
      resolve(item)
    })
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
    return new Promise(resolve => {
        localStorage.removeItem(key)
        resolve()
      })
  },

  setUser(user) {
    return this.setItem(this.userKey, JSON.stringify(user))
  },

  getUser() {
    return this.getItem(this.userKey, true)
  },

  deleteUser() {
    return this.removeItem(this.userKey)
  },

  setJwt(jwt) {
    return this.setItem(this.jwtKey, jwt)
  },

  getJwt() {
    return this.getItem(this.jwtKey)
  },

  deleteJwt() {
    return this.removeItem(this.jwtKey)
  }
}

export default localDb
