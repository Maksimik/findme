import React from 'react'
import {Row, Col} from 'react-bootstrap'

import SignInForm from './SignInForm'
import Layout from '../../core/Layout'

class SignIn extends React.Component {

  render() {
    return <Layout>
     <Row className="show-grid">
        <Col xs={1} md={3} />
        <Col xs={4} md={6}>
          <SignInForm />
        </Col>
        <Col xs={1} md={3} />
      </Row>
    </Layout>
  }
}

export default SignIn
