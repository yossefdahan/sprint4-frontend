import React, { useState } from "react";
import GoogleMapReact from 'google-map-react';


export function GoogleMap({ stay }) {
    const lat = stay.loc.lat
    const lng = stay.loc.lng
    const [coords, setCoords] = useState({ lat, lng })
    const zoom = 8
    const AnyReactComponent = ({ text }) => <div className="circleRed fa-brands fa-airbnb" style={{ fontSize: '3.5em' }}>{text}</div>;
    // circleRed
    // function handleLochSelect(locCoords) {
    //     setCoords(locCoords);
    // }

    return (
        <div style={{ display: 'flex', justifyContent: 'center', margin: '0px', flexDirection: "column" }}>
            <h2 className="map-review-title">Where you’ll be</h2>
            <p>{stay.loc.city} ,{stay.loc.country}</p>
            <div style={{ height: '40vh', width: '100%', marginTop: "10px" }}>
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
                        text=""

                    />

                </GoogleMapReact>
            </div>
            <h2 className="location-map-details">{stay.loc.city} ,{stay.loc.country}</h2>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet, laudantium ex nobis praesentium incidunt esse sed inventore iusto quidem et distinctio! Voluptatum sunt enim debitis, maiores praesentium beatae asperiores expedita blanditiis laboriosam quod ipsam aliquid, excepturi, soluta voluptas quisquam tempora saepe tempore deleniti quidem corrupti quam odit aut totam.</p>
        </div>
    );
}

