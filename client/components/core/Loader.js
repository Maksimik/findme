import React, {PropTypes} from 'react'
import ReactLoader from 'react-loader'

const Loader = (props) => {
  const defaultOptions = {
    lines: 13,
    length: 7,
    width: 2,
    radius: 10,
    corners: 1,
    rotate: 0,
    direction: 1,
    color: '#000',
    speed: 1.4,
    trail: 75,
    shadow: false,
    hwaccel: false,
    top: '50%',
    left: '50%',
    scale: 1.00
  }

  const options = {...defaultOptions, ...props}
  const minHeight = 2 * (Number(options.length) + Number(options.radius))

  return <div className="loader-wrapper" style={{minHeight: minHeight}} >
    <ReactLoader loaded={!props.show} options={options} {...props} />
  </div>
}

Loader.propTypes = {
  show: PropTypes.bool
}
Loader.defaultProps = {
  show: false
}

export default Loader
