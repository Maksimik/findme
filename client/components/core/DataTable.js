import React, {PropTypes} from 'react'
import {BootstrapTable} from 'react-bootstrap-table'

class DataTable extends React.Component {

  render() {
    const options = {
      sizePerPageList: [
        {
          text: '10', value: 10
        },
        {
          text: '25', value: 25
        },
        {
          text: '50', value: 50
        },
        {
          text: '100', value: 100
        },
        {
          text: 'All', value: this.props.data.length
        }
      ],
      sizePerPage: 10
    }

    return <BootstrapTable
      striped
      pagination={true}
      options={options}
      tableBodyClass="things-table"
      {...this.props}
    >
      {this.props.children}
    </BootstrapTable>
  }
}

DataTable.propTypes = {
  data: PropTypes.array
}
DataTable.defaultProps = {
  data: []
}

export default DataTable
