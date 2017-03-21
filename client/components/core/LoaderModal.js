import React, {PropTypes} from 'react'
import {Modal} from 'react-bootstrap'
import Loader from './Loader'

const LoaderModal = (props) => <Modal show={props.show} bsSize="small" animation={false}>
  <Modal.Body>
    <Loader show={true} />
    <div className="text-center">Please, wait...</div>
  </Modal.Body>
</Modal>

LoaderModal.propTypes = {
  show: PropTypes.bool
}
LoaderModal.defaultProps = {
  show: false
}

export default LoaderModal
