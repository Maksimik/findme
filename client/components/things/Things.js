import React from 'react'
import PageHeader from '../core/PageHeader'
import PageActions from '../core/PageActions'
import LinkButton from '../core/LinkButton'
import ThingsList from './ThingsList'

class Things extends React.Component {

  render() {
    return <div>
      <PageHeader title="Things" />
      <PageActions>
        <LinkButton to="/things/add" title="Add" />
      </PageActions>
      <ThingsList />
    </div>
  }
}

export default Things
