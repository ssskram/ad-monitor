import * as React from 'react'
import * as types from '../../store/types'

type props = {
    events: types.event[]
}

export default class Table extends React.Component<props, {}> {

    render() {
        return (
            <div className='col-md-10 col-md-offset-1'>
                <div className='panel'>
                    <div className='panel-body'>
                        Table here
                    </div>
                </div>
            </div>
        )
    }
}