import * as React from 'react'

export default class Home extends React.Component<{}, {}> {

    componentDidMount() {
        window.scrollTo(0, 0)
    }

    render() {
        return (
            <div className='col-md-10 col-md-offset-1' style={{ marginBottom: '50px' }}>
                    Home
            </div>
        )
    }
}