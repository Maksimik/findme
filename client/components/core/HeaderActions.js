import React from 'react'
import {Link} from 'react-router'

import Button from './Button'

class HeaderActions extends React.Component {

  render() {
    return <div className="pull-right">
      <Link to="/settings">
        <Button title="Settings" />
      </Link>
      <Link to="/signOut">
        <Button title="Sign out" />
      </Link>
    </div>
  }
}

export default HeaderActions
