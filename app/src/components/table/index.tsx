import * as React from 'react'
import * as types from '../../store/types'
import ReactTable from "react-table"
import "react-table/react-table.css"
const moment = require('moment')

type props = {
    containerWidth: string
    pageSize: number
    events: types.event[]
}

export default class Table extends React.Component<props, {}> {

    render() {
        const columns = [{
            Header: '',
            accessor: 'time',
            Cell: props => <div>{moment(props.value).format('MM/DD/YYYY hh:mm A')}</div>
        }, {
            Header: 'User',
            accessor: 'userName'
        }, {
            Header: 'City',
            accessor: 'city'
        }, {
            Header: 'State',
            accessor: 'state'
        }, {
            Header: 'Country',
            accessor: 'country'
        }, {
            Header: 'Application',
            accessor: 'appName'
        }, {
            Header: '',
            accessor: 'id',
            Cell: props => <button className='btn'><span className='glyphicon glyphicon-eye-open'></span></button>,
            maxWidth: 65
        }]

        return (
            <div className={this.props.containerWidth}>
                {this.props.events &&
                    <ReactTable
                        data={this.props.events
                            .sort((a, b) => +new Date(b.time) - +new Date(a.time))
                        }
                        columns={columns}
                        loading={false}
                        minRows={0}
                        pageSize={this.props.pageSize}
                        showPageSizeOptions={false}
                        noDataText=''
                    />
                }
            </div>
        )
    }
}