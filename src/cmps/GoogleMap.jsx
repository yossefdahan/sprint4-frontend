import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{ fontSize: '3.5em' }}>{text}</div>;

export function GoogleMap({ stay }) {
    const lat = stay.loc.lat
    const lng = stay.loc.lng
    const [coords, setCoords] = useState({ lat, lng })
    const zoom = 8

    // function handleLochSelect(locCoords) {
    //     setCoords(locCoords);
    // }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: "center", margin: '20px', flexDirection: "column" }}>
            <h1>Where you’ll be</h1>
            <h2>{stay.loc.city} ,{stay.loc.country}</h2>

            <div style={{ height: '50vh', width: '70%', marginTop: "10px" }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyDElUwXgKJIonNDyOlmaIafPh2rywqfCPY" }}
                    center={coords}
                    defaultZoom={zoom}
                // onClick={handleClick}
                >

                    <AnyReactComponent
                        key={stay.name}
                        lat={stay.loc.lat}
                        lng={stay.loc.lng}
                        text="😁"

                    />

                </GoogleMapReact>
            </div>
        </div>
    );
}

