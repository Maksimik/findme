import React, {PropTypes} from 'react'

const PageHeader = (props) => <h3>
  {props.title}
</h3>

PageHeader.propTypes = {
  title: PropTypes.string
}
PageHeader.defaultProps = {
  title: ''
}

export default PageHeader
