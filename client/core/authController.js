'use strict'

import {authService} from '../services'
import appController from './appController'
import localDb from './localDb'

/**
 * Authentication controller
 */
export default {

  signIn(credentials) {

    return authService.signIn(credentials)
      .then(response => {
        if (!response.token || !response.user) throw Error('Something went wrong. Please try again.')

        appController.setJwt(response.token)
        appController.setUser(response.user)

        return new Promise(resolve => {
           localDb.setJwt(response.token)
            .then(() =>
              localDb.setUser(response.user)
                .then(() => resolve(response))
            )
        })
      })
  },

  signOut() {

    return new Promise(resolve => {
      localDb.deleteJwt()
      .then(() =>
        localDb.deleteUser()
          .then(() => {
            appController.removeJwt()
            appController.removeUser()
            resolve()
          })
        )
    })
  },

  signUp(credentials) {

    return authService.signUp(credentials)
      .then(response => {
        if (!response.token || !response.user) throw Error('Something went wrong. Please try again.')

        appController.setJwt(response.token)
        appController.setUser(response.user)

        return new Promise(resolve => {
          localDb.setJwt(response.token)
            .then(() =>
              localDb.setUser(response.user)
                .then(() => resolve(response)))
          })
      })
  }
}
