import React, {PropTypes} from 'react'
import {Form, FormGroup, ControlLabel, Col} from 'react-bootstrap'


class Thing extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      thing: props.thing
    }
  }

  render() {
    if (!this.state.thing.title) return <div>Not found</div>

    return <Form horizontal>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Title:
        </Col>
        <Col sm={10}>
          {this.state.thing.title}
        </Col>
      </FormGroup>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
            Description:
        </Col>
        <Col sm={10}>
          {this.state.thing.description}
        </Col>
      </FormGroup>
    </Form>
  }
}

Thing.propTypes = {
  thing: PropTypes.object
}
Thing.defaultProps = {
  thing: {}
}

export default Thing
