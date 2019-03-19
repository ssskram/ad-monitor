
// returns all projects to home map

import * as React from "react"
import { compose, withProps } from "recompose"
import { withScriptjs, withGoogleMap, GoogleMap, Marker, InfoWindow } from "react-google-maps"
import { Helmet } from "react-helmet"
import * as types from '../../store/types'
import LoginsPerLocation from '../loginsPerLocation'
const { MarkerClusterer } = require("react-google-maps/lib/components/addons/MarkerClusterer")
const usIcon = require("../../images/us.png")
const intlIcon = require("../../images/intl.png")
const mapStyle = require('./darkStyle.json')

type props = {
    events: types.event[]
}

type state = {
    selectedLocation: types.event,
    viewLoginsPerLocation: boolean
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
            selectedLocation: undefined,
            viewLoginsPerLocation: false,
            zoom: 2,
            center: { lat: 40.437470539681442, lng: -79.987124601795273 }
        }
    }

    closeIW() {
        this.setState({
            selectedLocation: undefined,
            zoom: 6
        })
    }

    openIW(event) {
        this.setState({
            center: { lat: event.latitude, lng: event.longitude },
            selectedLocation: event,
            zoom: 13
        })
    }

    countEventsPerLocation() {
        const atLocation = this.props.events.filter(e => (e.latitude == this.state.selectedLocation.latitude && e.longitude == this.state.selectedLocation.longitude))
        return atLocation.length
    }

    render() {
        const {
            zoom,
            center,
            selectedLocation,
            viewLoginsPerLocation
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
                    fullscreenControl: false,
                    scaleControl: false,
                    mapTypeControl: false
                }}
            >
                {this.props.events &&
                    <MarkerClusterer
                        onClick={props.onMarkerClustererClick}
                        averageCenter
                        enableRetinaIcons
                        gridSize={50}
                        defaultMaxZoom={14}
                    >
                        {this.props.events.filter(e => e.country == "US").map(event => (
                            <Marker
                                key={event.id}
                                position={{ lat: event.latitude, lng: event.longitude }}
                                icon={{
                                    url: usIcon,
                                    scaledSize: new google.maps.Size(8, 8)
                                }}
                                onClick={() => this.openIW(event)}
                            />
                        ))}
                        {this.props.events.filter(e => e.country != "US").map(event => (
                            <Marker
                                key={event.id}
                                position={{ lat: event.latitude, lng: event.longitude }}
                                icon={{
                                    url: intlIcon,
                                    scaledSize: new google.maps.Size(8, 8)
                                }}
                                onClick={() => this.openIW(event)}
                            />
                        ))}
                        {selectedLocation &&
                            <InfoWindow
                                onCloseClick={() => this.closeIW()}
                                position={{ lat: selectedLocation.latitude, lng: selectedLocation.longitude }}
                                options={{
                                    maxWidth: 600
                                }}
                            >
                                <div className='text-center'>
                                    <div>{this.state.selectedLocation.city}</div>
                                    <div>{this.state.selectedLocation.state}, {this.state.selectedLocation.country}</div>
                                    <div>Count logins: {this.countEventsPerLocation()}</div>
                                    <a onClick={() => this.setState({ viewLoginsPerLocation: true })}>View events</a>
                                </div>
                            </InfoWindow>
                        }
                    </MarkerClusterer>
                }
            </GoogleMap>
        )
        return (
            <div>
                <Helmet><style>{'.col-sm-12,body{padding:0!important}.col-sm-12{width:100%!important}body{overflow-x:hidden}'}</style></Helmet>
                <div className='home-map'>
                    <MapComponent />
                </div>
                {viewLoginsPerLocation &&
                    <LoginsPerLocation
                        selectedLocation={selectedLocation}
                        events={this.props.events}
                        setState={this.setState.bind(this)}
                    />
                }
            </div>
        )
    }
}