import React, {PropTypes} from 'react'
import {HelpBlock} from 'react-bootstrap'

const InputHelp = (props) => props.show ? // eslint-disable-line no-confusing-arrow
  <HelpBlock>
    {props.message}
  </HelpBlock> :
  null

InputHelp.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string
}
InputHelp.defaultProps = {
  show: '',
  message: ''
}

export default InputHelp
