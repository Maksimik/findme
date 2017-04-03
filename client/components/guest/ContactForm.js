import React, {PropTypes} from 'react'
import {Form, FormGroup, ControlLabel, Col} from 'react-bootstrap'
import constants from '../../../shared/constants'
import _ from 'lodash'


class ContactForm extends React.Component {

  constructor(props) {
    super(props)

    let userProfile = {
      firstName: {
        label: 'First name',
        value: ''
      },
      lastName: {
        label: 'Last name',
        value: ''
      },
      phones: {
        label: 'Phones',
        values: []
      },
      address: {
        label: 'Address',
        value: ''
      },
      socialNetworks: {
        label: 'Social networks',
        values: []
      }
    }

    props.userProfile.forEach(x => {
      if (x.type === constants.FIRST_NAME) userProfile.firstName.value = x.value
      else if (x.type === constants.LAST_NAME) userProfile.lastName.value = x.value
      else if (x.type === constants.ADDRESS) userProfile.address.value = x.value
      else if (x.type === constants.PHONE) userProfile.phones.values.push(x.value)
      else if (x.type === constants.SOCIAL_NETWORK) userProfile.socialNetworks.values.push(x.value)
    })

    this.state = {
      userProfile: userProfile
    }
  }

  render() {

    let userProfile = this.state.userProfile
    let keys = Object.keys(userProfile)

    return <Form horizontal>
      {keys.map(key => {
          if ((key === 'firstName' || key === 'lastName' || key === 'address') &&
            userProfile[key].value !== '')
            return <FormGroup key={_.uniqueId()}>
              <Col componentClass={ControlLabel} sm={2}>
                {userProfile[key].label}:
              </Col>
              <Col sm={10}>
                {userProfile[key].value}
              </Col>
            </FormGroup>
          else if ((key === 'phones' || key === 'socialNetworks') &&
            userProfile[key].values.length > 0)
            return <FormGroup key={_.uniqueId()}>
              <Col componentClass={ControlLabel} sm={2}>
                {userProfile[key].label}:
              </Col>
              <Col sm={10}>
                {
                  userProfile[key].values.map(x => <div key={x}>{x}</div>)
                }
              </Col>
            </FormGroup>

            return <div />
        })
      }
      </Form>
    }
}

ContactForm.propTypes = {
  userProfile: PropTypes.array
}
ContactForm.defaultProps = {
  userProfile: []
}

export default ContactForm
