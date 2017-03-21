import React from 'react'
import {Row, Col} from 'react-bootstrap'

import Layout from '../../core/Layout'
import SignUpForm from './SignUpForm'
import PageHeader from '../../core/PageHeader'

class SignUp extends React.Component {

  render() {
    return <Layout>
    <PageHeader title="Sign up" />
      <Row className="show-grid">
        <Col xs={1} md={2} />
        <Col xs={5} md={8} >
          <SignUpForm />
        </Col>
      </Row>
    </Layout>
  }
}

export default SignUp
