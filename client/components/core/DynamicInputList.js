import React, {PropTypes} from 'react'
import {Glyphicon} from 'react-bootstrap'
import _ from 'lodash'
import Button from './Button'
import DynamicInput from './DynamicInput'


class DynamicInputList extends React.Component {
  constructor(props) {
    super(props)
    const values = props.values.map(x => {
      x.id = _.uniqueId()

      return x
    })

    this.state = {
      inputs: values || []
    }

    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onChange(input) {
    const inputs = this.state.inputs
    const index = _.findIndex(inputs, {id: input.id})
    inputs[index] = input
    this.setState({inputs})
    this.props.onChange(inputs)
  }

  onAdd() {
    const input = {
      id: _.uniqueId()
    }
    const inputs = this.state.inputs
    inputs.push(input)
    this.setState({inputs})
  }

  onDelete(input) {
    const inputs = this.state.inputs
    const index = _.findIndex(inputs, {id: input.id})
    inputs.splice(index, 1)
    this.setState({inputs})
    this.props.onChange(inputs)
  }

  render() {
    return <div>
      {this.state.inputs.map(input => <DynamicInput
        key={input.id}
        input={input}
        placeholder={this.props.placeholder}
        showDeleteButton={this.state.inputs.length > 1}
        onChange={this.onChange}
        onDelete={this.onDelete}
      />)}
      <Button
        bsStyle="success"
        title="Add"
        onClick={this.onAdd}
      >
        <Glyphicon glyph="plus" />
      </Button>
    </div>
  }
}

DynamicInputList.propTypes = {
  values: PropTypes.array,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
}
DynamicInputList.defaultProps = {
  values: [],
  onChange: null,
  placeholder: ''
}

export default DynamicInputList
