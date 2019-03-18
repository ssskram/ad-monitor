import * as React from 'react'
import { subscribeToEvents } from '../../sockets/riskEvents'
import * as types from '../../store/types'

type state = {
    events: types.event[]
}

export default class Home extends React.Component<{}, state> {
    constructor(props) {
        super(props)
        this.state = {
            events: undefined,
        }
        subscribeToEvents((err, events) => this.setState({events}))
    }

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        console.log(this.state)
        return (
            <div className='col-md-10 col-md-offset-1' style={{ marginBottom: '50px' }}>
                    Home
            </div>
        )
    }
}