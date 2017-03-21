import React, {PropTypes} from 'react'
import {Button as BsButton} from 'react-bootstrap'

const Button = (props) => <BsButton bsStyle="info" {...props}>
  {props.children || props.title}
</BsButton>

Button.propTypes = {
  title: PropTypes.string
}
Button.defaultProps = {
  title: ''
}

export default Button
