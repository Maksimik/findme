import React, {PropTypes} from 'react'
import Checkbox from './Checkbox'
import Loader from './Loader'

const CheckboxAction = (props) => props.loading ? // eslint-disable-line no-confusing-arrow
  <div className="checkbox-action-loader">
    <Loader show={true} length={1} radius={4} top="10px" lines={9} />
  </div> :
  <Checkbox {...props} />


CheckboxAction.propTypes = {
  loading: PropTypes.bool
}

CheckboxAction.defaultProps = {
  loading: false
}

export default CheckboxAction
