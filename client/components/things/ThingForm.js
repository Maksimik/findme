import React, {PropTypes} from 'react'
import {Form, FormGroup, FormControl, ControlLabel, Col} from 'react-bootstrap'
import Log from 'loglevel'
import Editor from '../core/Editor'
import InputHelp from '../core/InputHelp'
import Checkbox from '../core/Checkbox'
import Button from '../core/Button'
import LinkButton from '../core/LinkButton'
import LoaderModal from '../core/LoaderModal'
import Select from '../core/Select'
import appController from '../../core/appController'
import {browserHistory} from 'react-router'

import validate from '../../../shared/validation/validate'
import validationRules from '../../../shared/validation/Thing'

import {thingService} from '../../services'

class ThingForm extends React.Component {
  constructor(props) {
    super(props)

    const propsData = props.data || {}
    this.state = {
      title: propsData.title || '',
      description: propsData.description || '',
      status: propsData.status || '',
      isVisible: propsData.visible || false,
      availableStatus: [
        {value: 'lost', label: 'lost'},
        {value: 'calm', label: 'calm'}
      ],

      errors: {}
    }

    this.onTitleChange = this.onTitleChange.bind(this)
    this.onStatusChange = this.onStatusChange.bind(this)
    this.onDescriptionChange = this.onDescriptionChange.bind(this)
    this.onVisibleChange = this.onVisibleChange.bind(this)

    this.onSave = this.onSave.bind(this)
  }

  async onSave(event) {
    event.preventDefault()
    try {
      const data = {
        title: this.state.title,
        description: this.state.description,
        status: this.state.status.value || 'calm',
        visible: Number(this.state.isVisible),
        userId: appController.user.id
      }

      if (!this.validate(data)) {
        return
      }

      this.setState({loading: true})
      const response = this.props.id ?
        await thingService.update(this.props.id, data) :
        await thingService.add(data)

      if (!response.error) browserHistory.push('/')

      this.setState({loading: false})
      this.props.onSave()
    } catch (error) {
      Log.error(`Thing|onSave|error:${error}`)
      this.setState({loading: false})

      const errorResponse = (error.response || {}).error || {}
      if (errorResponse.validation) {
        this.setState({errors: errorResponse.validation})
      }
    }
  }

  validate(data) {
    const errors = validate(data, validationRules)
    this.setState({errors: errors || {}})

    return !errors
  }

  onTitleChange(event) {
    this.setState({title: event.target.value})
  }

  onStatusChange(status) {
    this.setState({status: status})
  }

  onDescriptionChange(description) {
    this.setState({description: description})
  }

  onVisibleChange() {
    this.setState({isVisible: !this.state.isVisible})
  }

  render() {
    return <Form horizontal>
      <FormGroup validationState={this.state.errors.title && 'error'}>
        <Col componentClass={ControlLabel} sm={2}>
          Title
        </Col>
        <Col sm={10}>
          <FormControl
            value={this.state.title}
            onChange={this.onTitleChange}
            placeholder="Title"
          />
          <InputHelp
            show={Boolean(this.state.errors.title)}
            message={(this.state.errors.title || [])[0]}
          />
        </Col>
      </FormGroup>

      <FormGroup validationState={this.state.errors.description && 'error'}>
        <Col componentClass={ControlLabel} sm={2}>
          Description
        </Col>
        <Col sm={10}>
          <Editor
            value={this.state.description}
            onContentChange={this.onDescriptionChange}
            placeholder="Description"
          />
          <InputHelp
            show={Boolean(this.state.errors.description)}
            message={(this.state.errors.description || [])[0]}
          />
        </Col>
      </FormGroup>

       <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Status
        </Col>
        <Col sm={10}>
          <Select
            multi={false}
            value={this.state.status}
            options={this.state.availableStatus}
            onChange={this.onStatusChange}
          />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Checkbox
            value={Boolean(this.state.isVisible)}
            onChange={this.onVisibleChange}
          >
            Is visible
          </Checkbox>
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

      <LoaderModal show={this.state.loading} />
    </Form>
  }
}

ThingForm.propTypes = {
  data: PropTypes.object,
  onSave: PropTypes.func
}
ThingForm.defaultProps = {
  data: {},
  onSave: null
}

export default ThingForm
