'use strict'

import React from 'react'
import {Route, browserHistory, IndexRoute} from 'react-router'
import appController from '../core/appController'
import authController from '../core/authController'
import Things from './things/Things'
import ThingAdd from './things/ThingAdd'
import ThingEdit from './things/ThingEdit'
import Settings from './settings/Settings'
import Thing from './guest/Thing'
import SignIn from './guest/signIn/SignIn'
import SignUp from './guest/signUp/SignUp'
import LayoutActions from './core/LayoutActions'

function decide(nextState, replace) {

  if (!appController.authenticated) {
    replace({
      pathname: '/signIn',
      state: {nextPathname: nextState.location.pathname}
    })

    return
  }
}

function signOut() {
  authController.signOut()
    .then(() => browserHistory.push('/'))
}

function onGuestEnter(nextState, replace) {
  if (!appController.authenticated) {
    return
  }

  replace({
    pathname: '/',
    state: {nextPathname: nextState.location.pathname}
  })
}

const App = <Route>
  <Route
    path="/"
    history={browserHistory}
    onEnter={decide}
    component={LayoutActions}
  >
    <IndexRoute component={Things}/>
    <Route path="/things/add" component={ThingAdd} />
    <Route path="/things/:id/edit" component={ThingEdit}/>

  </Route>
    <Route path="/settings" component={Settings}/>

    <Route path="/signIn" component={SignIn} onEnter={onGuestEnter} />
    <Route path="/signUp" component={SignUp} onEnter={onGuestEnter} />

    <Route path="/signOut" onEnter={signOut} />
    <Route path="/thing/:hash" component={Thing} />
</Route>

export default App
