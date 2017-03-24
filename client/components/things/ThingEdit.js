import React from 'react'
import {browserHistory} from 'react-router'
import Log from 'loglevel'
import PageHeader from '../core/PageHeader'
import PageActions from '../core/PageActions'
import LinkButton from '../core/LinkButton'
import ThingForm from './ThingForm'
import Loader from '../core/Loader'

import {thingService} from '../../services'

class ThingEdit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      thing: {},
      loading: true
    }
  }

  componentDidMount() {
    this.getThing()
  }

  getThing() {

    this.setState({loading: true})

    const thingId = parseInt(this.props.params.id, 10)

    thingService.getById(thingId)
      .then(response => {
        const thingResponse = response.thing

        const thing = {
          id: thingResponse.id,
          title: thingResponse.title,
          description: thingResponse.description,
          status: thingResponse.status,
          visible: thingResponse.visible
        }

        this.setState({thing, loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
        Log.error(`ThingEdit|getThing|error:${err}`)
        })
  }

  onSave() {
    browserHistory.push('/')
  }

  render() {
    return <div>
      <PageHeader title="Find me: Thing edit" />
      <PageActions>
        <LinkButton to="/" title="Things" />
      </PageActions>
      {this.state.loading ?
        <Loader show={this.state.loading} /> :
        <ThingForm onSave={this.onSave} data={this.state.thing} id={this.state.thing.id} />
      }
    </div>
  }
}

ThingEdit.propTypes = {
  params: React.PropTypes.object
}

export default ThingEdit
