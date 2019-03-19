import * as React from 'react'
import * as types from '../../store/types'
import Cleave from 'cleave.js/react'
import Table from '.'
import format from 'date-format'

type props = {
    events: types.event[]
}

type state = {
    date: string
    filter: string
    events: types.event[]
}

export default class Filter extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            date: '',
            filter: '',
            events: props.events
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.filter == '' && this.state.date == '') {
            this.setState({
                events: nextProps.events
            })
        }
    }

    filter(state: state) {
        if (state.date) {
            var date = state.date
        }
        if (state.filter) {
            var filter = state.filter.toLowerCase()
        }
        const filtered = this.props.events.filter(item => {
            if (date) {
                if (!format('MM/dd/yyyy', item.time).includes(date)) {
                    return false
                }
            }
            if (filter) {
                if (!item.userName.toLowerCase().includes(filter)) {
                    return false
                } 
            }
            return true
        })
        this.setState({ events: filtered })
    }

    render() {
        return (
            <div className='row'>
                <div className='col-md-10 col-md-offset-1' style={{ marginBottom: '15px' }}>
                    <div className='col-sm-4'>
                        <Cleave type='search'
                            className='form-control'
                            options={{ date: true }}
                            value={this.state.date}
                            placeholder='Filter by date'
                            onChange={d => this.setState({ date: d.target.value }, () => this.filter(this.state))}>
                        </Cleave>
                    </div>
                    <div className='col-sm-8'>
                        <input type='search'
                            className='form-control'
                            value={this.state.filter}
                            placeholder='Filter by name or location'
                            onChange={f => this.setState({ filter: f.target.value }, () => this.filter(this.state))}>
                        </input>
                    </div>
                </div>
                <Table
                    containerWidth='col-md-10 col-md-offset-1'
                    events={this.state.events}
                    pageSize={100}
                />
            </div>
        )
    }
}