import * as React from 'react'
import { subscribeToEvents } from '../../sockets/riskEvents'
import * as types from '../../store/types'
import Map from '../map'
import Table from '../table'
import Spinner from '../utilities/spinner'

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
            <div>
                <h4 className='text-center ubuntu' style={{ color: 'grey' }}>Previous 48 hours where login == success && state != PA</h4>
                <Map
                    events={this.state.events}
                />
                <br />
                <br />
                <Table
                    filterable={true}
                    events={this.state.events}
                    containerWidth='col-md-10 col-md-offset-1'
                    pageSize={100}
                />
                <br />
                <br />
                {!this.state.events &&
                    <Spinner notice='...loading login events...' />
                }
            </div>
        )
    }
}