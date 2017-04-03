import React, {PropTypes} from 'react'
import {FormControl, InputGroup, Glyphicon, Col} from 'react-bootstrap'
import Button from './Button'
import Checkbox from './Checkbox'


class DynamicInput extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      input: props.input || {}
    }

    this.onChange = this.onChange.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onChecked = this.onChecked.bind(this)
  }

  onChange(event) {
    const value = event.target.value
    const input = this.state.input
    input.value = value
    this.setState({input})
    this.props.onChange(input)
  }

  onChecked() {
    const input = this.state.input
    input.visible = !this.state.input.visible
    this.setState({input})
    this.props.onChange(input)
  }

  onDelete() {
    this.props.onDelete(this.state.input)
  }

  render() {
    return <div className="dynamic-list-input-wrapper" >
      <Col sm={11}>
        <InputGroup>
          <FormControl
            value={this.state.input.value}
            onChange={this.onChange}
            placeholder={this.props.placeholder}
          />
          <InputGroup.Button>
            <Button
              bsStyle="danger"
              onClick={this.onDelete}
            >
              <Glyphicon glyph="remove" />
            </Button>
          </InputGroup.Button>

        </InputGroup>
      </Col>
      <Col sm={1}>
        <Checkbox
          value={Boolean(this.state.input.visible)}
          onChange={this.onChecked}/>
          </Col>
    </div>
  }
}

DynamicInput.propTypes = {
  input: PropTypes.object,
  placeholder: PropTypes.string,
  onDelete: PropTypes.func,
  onChange: PropTypes.func
}
DynamicInput.defaultProps = {
  input: {},
  placeholder: '',
  onDelete: null,
  onChange: null
}

export default DynamicInput
