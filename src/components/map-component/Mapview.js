import React, { Component } from 'react';
import 'react-leaflet';
import 'leaflet';
import './Mapview.css'
import 'leaflet/dist/leaflet.css';
import {
    Map,
    TileLayer,
} from 'react-leaflet';


class Mapview extends Component {
    state = {currentLocation: { lat: 33.4484, lng: -112 }, //{ lat: 25, lng: -80 }{ lat: -6.5948, lng: 158.0366 }
    zoom: 12, //5
    accessToken:'o1RJMTA22fWIFHfZp6ZqGTO0XNGLh2KK1JCrWzHTBJr22tEtFqIRHihtI7of0lEc'
}
    render() { 
        const position = this.state.currentLocation;
        const zoomLevel = this.state.zoom;
        //const token = this.state.accessToken;

        return (
        <Map className= 'map'
          zoom={zoomLevel}
          maxZoom={15}
          minZoom={3}
          center={position}
          preferCanvas={true}
        >
        <TileLayer
            attribution='&copy;<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=o1RJMTA22fWIFHfZp6ZqGTO0XNGLh2KK1JCrWzHTBJr22tEtFqIRHihtI7of0lEc"
        />
        </Map>
        );
    }
}
 
export default Mapview;