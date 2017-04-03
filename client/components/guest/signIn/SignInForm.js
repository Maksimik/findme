import React from 'react'
import {browserHistory} from 'react-router'
import {Form, FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap'
import Log from 'loglevel'
import authController from '../../../core/authController'
import LinkButton from '../../core/LinkButton'


class SignInForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: ''
    }

    this.onLoginChange = this.onLoginChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLoginChange(event) {
    this.setState({
      login: event.target.value
    })
  }

  onPasswordChange(event) {
    this.setState({
      password: event.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault()

    const credentials = {
      login: this.state.login,
      password: this.state.password
    }

    authController.signIn(credentials)
      .then(() => browserHistory.push('/'))
      .catch(err => Log.error(`Guest|SignIn|onSubmit|${err}`))
  }

  render() {
    return <div>
      <Form onSubmit={this.onSubmit} horizontal>
        <FormGroup controlId="formHorizontalEmail">
          <Col componentClass={ControlLabel} md={2}>
            Login
          </Col>
          <Col md={10}>
            <FormControl
              value={this.state.login}
              onChange={this.onLoginChange}
              placeholder="Login"
            />
          </Col>
        </FormGroup>

        <FormGroup controlId="formHorizontalPassword">
          <Col componentClass={ControlLabel} md={2}>
            Password
          </Col>
          <Col md={10}>
            <FormControl
              value={this.state.password}
              onChange={this.onPasswordChange}
              type="password"
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={2} md={10}>
            <Button type="submit" bsStyle="success" >
              Ok
            </Button>
            <LinkButton bsStyle="default" to="/signUp" title="Sign Up" />
          </Col>
        </FormGroup>
      </Form>
    </div>
  }
}

export default SignInForm
