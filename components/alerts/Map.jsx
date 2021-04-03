import React, { Component, createRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapControl, withLeaflet } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default class Map extends Component {
    state = {
        center: {
            lat: 33.4484, 
            lng: -112
        },
        marker: {
            lat: 33.4484,
            lng: -112,
          },
        zoom: 12,
        draggable: true,
    }
    //const token = 'o1RJMTA22fWIFHfZp6ZqGTO0XNGLh2KK1JCrWzHTBJr22tEtFqIRHihtI7of0lEc';

    refmarker = createRef(this.state.marker)

    toggleDraggable = () => {
      this.setState({ draggable: !this.state.draggable });
    }
  
    updateMarker = (e) => {
      // const marker = e.marker;
      this.setState({
        marker: e.marker.getLatLng(),
      });
      console.log(e.marker.getLatLng());
    }
  
    updatePosition = () => {
      const marker = this.refmarker.current;
      if (marker != null) {
        this.setState({
          marker: marker.leafletElement.getLatLng(),
        });
      }
      console.log(marker.leafletElement.getLatLng());
    }

    render() {
        const position = [this.state.center.lat, this.state.center.lng];
        const markerPosition = [this.state.marker.lat, this.state.marker.lng];

        return( 
            <div className="map-root">
                <MapContainer
                zoom={this.state.zoom}
                maxZoom={15}
                minZoom={3}
                center={position}
                style={{height:"700px"}}
                >
                <TileLayer
                    attribution='&copy;<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank"> <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.jawg.io/jawg-terrain/{z}/{x}/{y}{r}.png?access-token=o1RJMTA22fWIFHfZp6ZqGTO0XNGLh2KK1JCrWzHTBJr22tEtFqIRHihtI7of0lEc"
                />
                {/* <Marker
                    draggable={true}
                    onDragend={this.updatePosition}
                    position={markerPosition}
                    animate={true}
                    ref={this.refmarker}>
                    <Popup minWidth={90}>
                    <span onClick={this.toggleDraggable}>
                        {this.state.draggable ? 'DRAG MARKER' : 'MARKER FIXED'}
                    </span>
                    </Popup>
                </Marker> */}
                </MapContainer>
                <style jsx>{`
                    .map-root {
                    height: 100%;
                    }
                    .leaflet-container {
                    height: 400px !important;
                    width: 80%;
                    margin: 0 auto;
                }
            `}
            </style>
            </div>
        );
    }
}