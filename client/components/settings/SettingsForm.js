import React from 'react'
import {browserHistory} from 'react-router'
import LinkButton from '../core/LinkButton'
import Button from '../core/Button'
import DynamicInputList from '../core/DynamicInputList'
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap'
import appController from '../../core/appController'
import Checkbox from '../core/Checkbox'
import {userService} from '../../services'
import constants from '../../../shared/constants'
import Loader from '../core/Loader'

class SettingsForm extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      profile: {},
      loading: true
    }

    this.onFirstNameChange = this.onFirstNameChange.bind(this)
    this.onLastNameChange = this.onLastNameChange.bind(this)
    this.onPhonesChange = this.onPhonesChange.bind(this)
    this.onAddressChange = this.onAddressChange.bind(this)
    this.onSocialNetworksChange = this.onSocialNetworksChange.bind(this)

    this.onFirstNameChecked = this.onFirstNameChecked.bind(this)
    this.onLastNameChecked = this.onLastNameChecked.bind(this)
    this.onAddressChecked = this.onAddressChecked.bind(this)

    this.onSave = this.onSave.bind(this)
  }

  componentDidMount() {
    this.getThing()
  }

  getThing() {

    this.setState({loading: true})

    const userId = appController.user.id
    let userProfile = {
      firstName: {
        type: constants.FIRST_NAME,
        value: '',
        visible: false
      },
      lastName: {
        type: constants.LAST_NAME,
        value: '',
        visible: false
      },
      phones: [],
      address: {
        type: constants.ADDRESS,
        value: '',
        visible: false
      },
      socialNetworks: []
    }
    userService.get(userId)
      .then(res => {
        res.forEach(x => {
          if (x.type === constants.FIRST_NAME) userProfile.firstName = x
          else if (x.type === constants.LAST_NAME) userProfile.lastName = x
          else if (x.type === constants.ADDRESS) userProfile.address = x
          else if (x.type === constants.PHONE) userProfile.phones.push(x)
          else if (x.type === constants.SOCIAL_NETWORK) userProfile.socialNetworks.push(x)
        })
        this.setState({profile: userProfile, loading: false})
      })
  }

  onFirstNameChange(event) {
    let profile = this.state.profile
    profile.firstName.value = event.target.value
    this.setState({profile})
  }

  onFirstNameChecked() {
    let profile = this.state.profile
    profile.firstName.visible = !profile.firstName.visible
    this.setState({profile})
  }

  onLastNameChange(event) {
    let profile = this.state.profile
    profile.lastName.value = event.target.value
    this.setState({profile})
  }

  onLastNameChecked() {
    let profile = this.state.profile
    profile.lastName.visible = !profile.lastName.visible
    this.setState({profile})
  }

  onPhonesChange(values) {
    let profile = this.state.profile
    profile.phones = values
    this.setState({profile})
  }

  onAddressChange(event) {
    let profile = this.state.profile
    profile.address.value = event.target.value
    this.setState({profile})
  }

  onAddressChecked() {
    let profile = this.state.profile
    profile.address.visible = !profile.address.visible
    this.setState({profile})
  }

  onSocialNetworksChange(values) {
    let profile = this.state.profile
    profile.socialNetworks = values
    this.setState({profile})
  }

  onSave(event) {
    event.preventDefault()

    let data = []

    if (this.state.profile.firstName.value)
      data.push(this.state.profile.firstName)

    if (this.state.profile.lastName.value)
      data.push(this.state.profile.lastName)

    if (this.state.profile.address.value)
      data.push(this.state.profile.address)

    const phones = this.state.profile.phones.filter(phone => Boolean(phone.value))
    phones.map(phone => data.push({
        type: constants.PHONE,
        value: phone.value,
        visible: Boolean(phone.visible)

      })
    )

    const socialNetworks = this.state.profile.socialNetworks.filter(socialNetwork => Boolean(socialNetwork.value))
    socialNetworks.map(socialNetwork => data.push({
        type: constants.SOCIAL_NETWORK,
        value: socialNetwork.value,
        visible: Boolean(socialNetwork.visible)
      })
    )
    userService.update(appController.user.id, data)
      .then(() => browserHistory.push('/'))

  }

  render() {
    return <div>
    {this.state.loading ?
      <Loader show={this.state.loading} /> :
        <Form horizontal>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            First name
          </Col>
          <Col sm={9}>
          <FormControl
            value={this.state.profile.firstName.value}
            onChange={this.onFirstNameChange}
            placeholder="First name"
          />
          </Col>
          <Col sm={1}>
            <Checkbox
              onChange={this.onFirstNameChecked}
              value={Boolean(this.state.profile.firstName.visible)}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Last name
          </Col>
          <Col sm={9}>
          <FormControl
            value={this.state.profile.lastName.value}
            onChange={this.onLastNameChange}
            placeholder="Last name"
          />
          </Col>
          <Col sm={1}>
            <Checkbox
              value={Boolean(this.state.profile.lastName.visible)}
              onChange={this.onLastNameChecked}
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Phone
          </Col>
          <Col sm={10}>
            <DynamicInputList
              values={this.state.profile.phones}
              placeholder="Phone"
              onChange={this.onPhonesChange} />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Address
          </Col>
          <Col sm={9}>
          <FormControl
            value={this.state.profile.address.value}
            onChange={this.onAddressChange}
            placeholder="Address"
          />
          </Col>
          <Col sm={1}>
            <Checkbox
              value={Boolean(this.state.profile.address.visible)}
              onChange={this.onAddressChecked}/>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Social networks
          </Col>
          <Col sm={10}>
            <DynamicInputList
              values={this.state.profile.socialNetworks}
              placeholder="Social networks"
              onChange={this.onSocialNetworksChange} />
          </Col>
        </FormGroup>


        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="button" bsStyle="success" onClick={this.onSave}>
              Save
            </Button>
            <LinkButton to="/" title="Cancel" bsStyle="default" />
          </Col>
        </FormGroup>

      </Form>
    }
   </div>
  }

}

export default SettingsForm
