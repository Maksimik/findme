import React from 'react'
import PageHeader from '../core/PageHeader'
import PageActions from '../core/PageActions'
import LinkButton from '../core/LinkButton'
import ThingForm from './ThingForm'
import {browserHistory} from 'react-router'


class ThingAdd extends React.Component {

  onSave() {
    browserHistory.push('/')
  }
  render() {
    return <div>
      <PageHeader title="Thing add" />
      <PageActions>
        <LinkButton to="/" title="Things" />
      </PageActions>
      <ThingForm onSave={this.onSave}/>
    </div>
  }
}

export default ThingAdd
