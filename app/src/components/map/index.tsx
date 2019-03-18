
// returns all projects to home map

import * as React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { Helmet } from "react-helmet"
import * as types from '../../store/types'
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer")

const mapStyle = require('./darkStyle.json')

type props = {
    events: types.event[]
}

type state = {
    zoom: number
    center: {
        lat: number
        lng: number
    }
}

export default class Map extends React.Component<props, state> {
    constructor(props) {
        super(props)
        this.state = {
            zoom: 2,
            center: { lat: 40.437470539681442, lng: -79.987124601795273 }
        }
    }

    render() {
        const {
            zoom,
            center,
        } = this.state

        const key = process.env.REACT_APP_GOOGLE_API
        const MapComponent = compose(
            withProps({
                googleMapURL: "https://maps.googleapis.com/maps/api/js?key=" + key + "&v=3.exp&libraries=geometry,drawing,places",
                loadingElement: <div style={{ height: `100%`, }} />,
                containerElement: <div style={{ height: `100%` }} />,
                mapElement: <div style={{ height: `100%` }} />
            }),
            withScriptjs,
            withGoogleMap
        )((props) =>
            <GoogleMap
                defaultZoom={zoom}
                defaultCenter={center}
                defaultOptions={{
                    styles: mapStyle as any,
                    streetViewControl: false,
                    scaleControl: false,
                    mapTypeControl: false
                }}
            >
                <MarkerClusterer
                    onClick={props.onMarkerClustererClick}
                    averageCenter
                    enableRetinaIcons
                    gridSize={60}
                >
                    {this.props.events.map(event => (
                        <Marker
                            key={event.id}
                            position={{ lat: event.latitude, lng: event.longitude }}
                        />
                    ))}
                </MarkerClusterer>
            </GoogleMap>
        )
        return (
            <div>
                <Helmet><style>{'.col-sm-12,body{padding:0!important}.col-sm-12{width:100%!important}body{overflow-x:hidden}'}</style></Helmet>
                <div className='home-map'>
                    <MapComponent />
                </div>
            </div>
        )
    }
}