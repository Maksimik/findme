import React, {PropTypes} from 'react'
import Layout from '../core/Layout'
import PageHeader from '../core/PageHeader'
import {thingService} from '../../services'
import Loader from '../core/Loader'
import LoaderModal from '../core/LoaderModal'
import ThingForm from './ThingForm'
import Log from 'loglevel'


class Thing extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      thing: {},
      loading: true,
      loadingModal: false
    }
  }

  componentDidMount() {
    this.getThing()
  }

  getThing() {
    this.setState({loading: true})
    const hash = this.props.params.hash

    thingService.getByHash(hash)
      .then(response => {
        const thingResponse = response.thing

        if (thingResponse) {
          const thing = {
            id: thingResponse.id,
            title: thingResponse.title,
            description: thingResponse.description,
            status: thingResponse.status,
            visible: thingResponse.visible
          }
          this.setState({thing})
        }
        this.setState({loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
        Log.error(`ThingEdit|getThing|error:${err}`)
      })
  }

  render() {

    return <Layout>
      <PageHeader title="Thing" />
      {this.state.loading ?
          <Loader show={this.state.loading} /> :
          <ThingForm thing={this.state.thing}/>
      }
      <LoaderModal show={this.state.loadingModal} />
    </Layout>
  }
}

Thing.propTypes = {
  params: PropTypes.object
}
Thing.defaultProps = {
  params: {}
}

export default Thing
