import React from 'react'
import {PageHeader, Clearfix} from 'react-bootstrap'

class Header extends React.Component {

  render() {
    return <PageHeader>Find me
      <div>
        {this.props.children}
      </div>
      <Clearfix />
    </PageHeader>
  }
}

export default Header
