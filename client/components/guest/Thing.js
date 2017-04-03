import React, {PropTypes} from 'react'
import Layout from '../core/Layout'
import PageHeader from '../core/PageHeader'
import {thingService, userService} from '../../services'
import Loader from '../core/Loader'
import LoaderModal from '../core/LoaderModal'
import ThingForm from './ThingForm'
import ContactForm from './ContactForm'
import Log from 'loglevel'


class Thing extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      thing: {},
      userProfile: [],
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

          userService.getUserProfileById(thing.id)
            .then(res => {
              this.setState({userProfile: res})
              this.setState({loading: false})
            })
            .catch(err => {
              this.setState({loading: false})
              Log.error(`Thing|getThing|error:${err}`)
            })
        }
      })
      .catch(err => {
        this.setState({loading: false})
        Log.error(`Thing|getThing|error:${err}`)
      })
  }

  render() {
    return <Layout>
      <PageHeader title="Thing" />
      {this.state.loading ?
          <Loader show={this.state.loading} /> :
          <div>
            <ThingForm thing={this.state.thing}/>
            <PageHeader title="Contact Information" />
            {this.state.userProfile.length > 0 ?
              <ContactForm userProfile={this.state.userProfile} /> :
              <div>Not found</div>
            }
          </div>
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
