import React from 'react'
import {Col} from 'react-bootstrap'

import Header from './Header'
import Footer from './Footer'
import HeaderActions from './HeaderActions'

class Layout extends React.Component {

  render() {
    return <Col xs={12} md={8} mdOffset={2}>
      <Header>
        <HeaderActions/>
      </Header>
      <div id="main" role="main">
        <div id="content">
          {this.props.children}
        </div>
      </div>
      <Footer/>
    </Col>
  }
}

export default Layout
