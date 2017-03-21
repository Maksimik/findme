'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory} from 'react-router'
import routes from './routes'

import localDb from '../core/localDb'
import appController from '../core/appController'

function init() {

  const jwtToken = localDb.getJwt()
  if (jwtToken) {
    const user = localDb.getUser()

    appController.setJwt(jwtToken)
    appController.setUser(user)
  }

  ReactDOM.render(
    <Router history={browserHistory}>
      {routes}
    </Router>,
    document.getElementById('react')
  )
}

init()
