import React from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
const token =
  "pk.eyJ1IjoiZm9uc29nbXMiLCJhIjoiY2swbWRsZWo3MTV6bTNkcW9vc29ybDZyMSJ9.EiT_I5moTDeyh3CM_Uc5CQ";
const Map = (props) => {
  interface ViewPort {
    longitude: number;
    latitude: number;
    width: string;
    height: string;
    zoom: number;
  }
  let firstView: ViewPort = {
    longitude: props.location.longitude,
    latitude: props.location.latitude,
    width: "60vw",
    height: "60vh",
    zoom: 15,
  };

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <ReactMapGL
        {...firstView}
        mapboxApiAccessToken={token}
        mapStyle="mapbox://styles/fonsogms/ck9h762i810v71io0zxm8bg2k"
      >
        <Marker longitude={firstView.longitude} latitude={firstView.latitude}>
          <img
            src="/external-content.duckduckgo.com.png"
            alt=""
            style={{ width: "50px", height: "auto" }}
          />{" "}
        </Marker>
      </ReactMapGL>
    </div>
  );
};

export default Map;
