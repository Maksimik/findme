import React from 'react'
import {TableHeaderColumn} from 'react-bootstrap-table'
import Log from 'loglevel'
import DataTable from '../core/DataTable'
import {thingService} from '../../services'
import appController from '../../core/appController'
import Button from '../core/Button'
import LinkButton from '../core/LinkButton'
import Loader from '../core/Loader'
import LoaderModal from '../core/LoaderModal'
import CheckboxAction from '../core/CheckboxAction'
import _ from 'lodash'

class ThingsList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      things: [],
      loading: true,
      loadingModal: false,
      visibleRowsProcessing: []
    }
    this.activeFormatter = this.activeFormatter.bind(this)
    this.urlFormatter = this.urlFormatter.bind(this)
  }

  componentDidMount() {
    this.getThings()
  }

  getThings() {
    this.setState({loading: true})
    thingService.getAll(appController.user.id)
      .then(response => {
        this.setState({things: response.things, loading: false})
      })
      .catch(err => {
        this.setState({loading: false})
        Log.error(`ThingsList|getThings|error:${err}`)
      })
  }

  actionFormatter(value, row) {
    return <div>
        <LinkButton to={`/things/${row.id}/edit`} title="Edit" bsStyle="primary" bsSize="xsmall" />
        <Button
          title="Delete"
          bsStyle="danger"
          bsSize="xsmall"
          onClick={this.deleteThing.bind(this, row.id)}
        />
      </div>
  }

  urlFormatter(value) {
    return <div>
        {`localhost:9000/thing/${value}`}
      </div>
  }

  activeFormatter(value, row) {
    const loading = this.state.visibleRowsProcessing.indexOf(row.id) !== -1

    return <CheckboxAction
      loading={loading}
      value={Boolean(value)}
      onChange={this.onVisibleChange.bind(this, row)}
    />
  }

  addToVisibleProcessing(id) {
    if (this.state.visibleRowsProcessing.indexOf(id) !== -1) return

    const visibleRowsProcessing = this.state.visibleRowsProcessing

    this.state.visibleRowsProcessing.push(id)
    this.setState({visibleRowsProcessing})
  }

  removeFromVisibleProcessing(id) {
    const visibleRowsProcessing = this.state.visibleRowsProcessing
    const index = visibleRowsProcessing.indexOf(id)

    if (index === -1) return

    visibleRowsProcessing.splice(index, 1)
    this.setState({visibleRowsProcessing})
  }

  onVisibleChange(row) {

    this.addToVisibleProcessing(row.id)
    const newIsVisible = !row.visible
    thingService.update(row.id, {visible: Number(newIsVisible)})
      .then(() => {
        const index = _.findIndex(this.state.things, {id: row.id})
        row.visible = newIsVisible
        const things = this.state.things
        things.splice(index, 1, row)

        setTimeout(this.removeFromVisibleProcessing.bind(this, row.id), 350)
        this.setState({things})
      })
      .catch(err => {
        this.removeFromVisibleProcessing(row.id)
        Log.error(`ThingsList|onVisibleChange|error:${err}`)
      })
  }

  deleteThing(id) {
    this.setState({loadingModal: true})
      thingService.delete(id)
        .then(() => {
          const things = this.state.things
          const index = _.findIndex(things, {id: id})
          things.splice(index, 1)

          this.setState({things, loadingModal: false})
        })
        .catch(err => {
          Log.error(`ThingsList|deleteThing|error:${err}`)
          this.setState({loadingModal: false})
        })
  }

  render() {
    if (this.state.loading) {
      return <Loader show={this.state.loading} />
    }

    return <div>
      <DataTable data={this.state.things}>
        <TableHeaderColumn isKey dataField="id" width="30px" >
          Id
        </TableHeaderColumn>
        <TableHeaderColumn dataField="title" width="70px" >
          Title
        </TableHeaderColumn>
        <TableHeaderColumn dataField="hash"
          width="90px"
          dataFormat={this.urlFormatter} >
          Url
        </TableHeaderColumn>
        <TableHeaderColumn dataField="status" width="40px" >
          Status
        </TableHeaderColumn>
        <TableHeaderColumn
          dataField="visible"
          dataFormat={this.activeFormatter}
          dataAlign="center"
          width="40px" >
          Visible
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={this.actionFormatter.bind(this)} dataAlign="center" width="70px">
          Actions
        </TableHeaderColumn>
      </DataTable>
      <LoaderModal show={this.state.loadingModal} />
    </div>
  }
}

export default ThingsList
