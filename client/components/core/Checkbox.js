import React, {PropTypes} from 'react'
import {Checkbox as BsCheckbox} from 'react-bootstrap'

class Checkbox extends React.Component {
  render() {
    return <BsCheckbox checked={this.props.value} onChange={this.props.onChange} >
      {this.props.children}
    </BsCheckbox>
  }
}

Checkbox.propTypes = {
  value: PropTypes.bool,
  onChange: PropTypes.func
}
Checkbox.defaultProps = {
  value: false,
  onChange: null
}

export default Checkbox
