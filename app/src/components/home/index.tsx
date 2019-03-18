import * as React from 'react'
import { subscribeToEvents } from '../../sockets/riskEvents'
import * as types from '../../store/types'
import Map from '../map'
import Table from '../table'

type state = {
    events: types.event[]
}

export default class Home extends React.Component<{}, state> {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
        }
        subscribeToEvents((err, events) => this.setState({ events }))
    }

    shouldComponentUpdate(nextProps, nextState) {
        if (this.state.events) {
            if (nextState.events.length == this.state.events.length) return false
            else return true
        } else return true
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div style={{ marginBottom: '50px' }}>
                <Map
                    events={this.state.events}
                />
                <Table
                    events={this.state.events}
                />
            </div>
        )
    }
}