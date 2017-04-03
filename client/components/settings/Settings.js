import React from 'react'
import Layout from '../core/Layout'
import PageHeader from '../core/PageHeader'
import PageActions from '../core/PageActions'
import LinkButton from '../core/LinkButton'
import SettingsForm from './SettingsForm'

class Settings extends React.Component {

  render() {
    return <Layout>
      <PageHeader title="Settings" />
      <PageActions>
        <LinkButton to="/" title="Things" />
      </PageActions>
      <SettingsForm />
    </Layout>
  }
}

export default Settings
