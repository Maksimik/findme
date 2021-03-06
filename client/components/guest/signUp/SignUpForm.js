import React from 'react'
import {browserHistory} from 'react-router'
import {Form, FormGroup, FormControl, ControlLabel, Col, Button} from 'react-bootstrap'
import Log from 'loglevel'
import authController from '../../../core/authController'
import InputHelp from '../../core/InputHelp'
import validationRules from './ValidationRules'
import validate from '../../../../shared/validation/validate'
import LinkButton from '../../core/LinkButton'


class SignUpForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      errors: {},
      invalidLogin: ''
    }

    this.onLoginChange = this.onLoginChange.bind(this)
    this.onPasswordChange = this.onPasswordChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onLoginChange(event) {
    this.setState({
      login: event.target.value,
      invalidLogin: ''
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

    if (!this.validate(credentials)) {
        return
    }

    authController.signUp(credentials)
      .then(response => {
        if (response.error) {
          this.setState({invalidLogin: response.error})
        } else {
          browserHistory.push('/settings')

        }
      })
      .catch(err => Log.error(`Guest|Login|onSubmit|err:${err}`))
  }

  validate(data) {
    const errors = validate(data, validationRules)
    this.setState({errors: errors || {}})

    return !errors
  }

  render() {
    return <div>
      <Form onSubmit={this.onSubmit} horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Login
          </Col>
          <Col sm={6}>
            <FormControl
              value={this.state.login}
              onChange={this.onLoginChange}
              placeholder="Login"
            />
            <InputHelp
              show={this.state.invalidLogin === '' ? Boolean(this.state.errors.login) : true}
              message={this.state.invalidLogin === '' ? (this.state.errors.login || [])[0] : this.state.invalidLogin}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={3}>
            Password
          </Col>
          <Col sm={6}>
            <FormControl
              value={this.state.password}
              onChange={this.onPasswordChange}
              placeholder="Password"
            />
            <InputHelp
              show={Boolean(this.state.errors.password)}
              message={(this.state.errors.password || [])[0]}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col mdOffset={5}>
            <Button type="submit" bsStyle="success">
              Ok
            </Button>
            <LinkButton bsStyle="default" to="/signIn" title="Sign In" />
          </Col>
        </FormGroup>

      </Form>
    </div>
  }
}

export default SignUpForm
