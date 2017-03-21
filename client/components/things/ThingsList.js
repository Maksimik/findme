import React from 'react'
import {TableHeaderColumn} from 'react-bootstrap-table'
import Log from 'loglevel'
import DataTable from '../core/DataTable'
import {thingService} from '../../services'
import Button from '../core/Button'
import LinkButton from '../core/LinkButton'
import Loader from '../core/Loader'
import LoaderModal from '../core/LoaderModal'

class ThingsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      things: [],
      loading: true,
      loadingModal: false
    }
  }

  componentDidMount() {
    this.getThings()
  }

  async getThings() {
    try {
      this.setState({loading: true})
      const response = await thingService.getAll()
      const things = response.things
      this.setState({things, loading: false})
    } catch (err) {
      this.setState({loading: false})
      Log.error(`ThingsList|getThings|error:${err}`)
    }
  }

  actionFormatter(value, row) {
    return <div>
        <LinkButton to={`/things/${row.id}/edit`} title="Edit" bsStyle="primary" bsSize="xsmall" />
        <Button
          title="Delete"
          bsStyle="danger"
          bsSize="xsmall"
        />
      </div>
  }

  render() {
    if (this.state.loading) {
      return <Loader show={this.state.loading} />
    }

    return <div>
      <DataTable data={this.state.things}>
        <TableHeaderColumn isKey dataField="id" width="50px" >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="title" width="70px" >
          Title
        </TableHeaderColumn>
        <TableHeaderColumn dataField="status" width="70px" >
          Status
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.actionFormatter.bind(this)} dataAlign="center" width="100px">
          Actions
        </TableHeaderColumn>
      </DataTable>
      <LoaderModal show={this.state.loadingModal} />
    </div>
  }
}

export default ThingsList
