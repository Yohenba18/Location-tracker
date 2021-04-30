import "./App.css";
import { GOOGLE_API_KEY } from "./config.js";
import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      useAddress: null,
    };
    this.getLocation = this.getLocation.bind(this);
    this.getCoordinates = this.getCoordinates.bind(this);
  }

  getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this.getCoordinates,
        this.handleLocationError
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  getCoordinates(position) {
    // console.log(position.coords)
    this.setState({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
  }

  handleLocationError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Location Tracker</h1>
        <button onClick={this.getLocation}>Get Coordinates</button>
        <h4>HTML5 coordinates</h4>
        <p>Latitiude : {this.state.latitude}</p>
        <p>Longitude : {this.state.longitude}</p>
        <h4>Google Reverse Geocoding</h4>
        <p>Address: {this.state.useAddress}</p>
        {this.state.latitude && this.state.longitude ? (
          <img
            src={`https://maps.googleapis.com/maps/api/staticmap?center="+latlon+"&zoom=14&size=400x300&sensor=false&key=${GOOGLE_API_KEY}`}
            alt=""
          />
        ) : null}
      </div>
    );
  }
}

export default App;
