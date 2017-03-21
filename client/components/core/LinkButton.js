import React, {PropTypes} from 'react'
import {Link} from 'react-router'

import Button from './Button'

const LinkButton = (props) => <Link to={props.to}>
        <Button {...props} />
      </Link>

LinkButton.propTypes = {
  to: PropTypes.string
}
LinkButton.defaultProps = {
  to: ''
}

export default LinkButton
