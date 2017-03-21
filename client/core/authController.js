'use strict'

import {authService} from '../services'
import appController from './appController'
import localDb from './localDb'

/**
 * Authentication controller
 */
export default {

  async signIn(credentials) {
    const response = await authService.signIn(credentials)
    if (!response.token || !response.user) throw Error('Something went wrong. Please try again.')

    appController.setJwt(response.token)
    appController.setUser(response.user)

    await localDb.setJwt(response.token)
    await localDb.setUser(response.user)

    return response
  },

  async signOut() {
    await localDb.deleteJwt()
    await localDb.deleteUser()
    appController.removeJwt()
    appController.removeUser()
  },

  async signUp(credentials) {
    const response = await authService.signUp(credentials)

    if (response.token && response.user) {

      appController.setJwt(response.token)
      appController.setUser(response.user)

      await localDb.setJwt(response.token)
      await localDb.setUser(response.user)
    }

    return response
  }
}
