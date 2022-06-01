
import './App.css';
import 'leaflet/dist/leaflet.css';
import React, { Component, Fragment } from 'react';
import { MapComponent } from './components/MapComponent';
import {Graph } from './components/piechart';
import {Pane } from './components/dataview';

function App() {

    return(
    <div>
        <div className="Principal">
            <div className="Title">
                <h1> sHApp </h1>

            </div>

            <div className="App">
                <MapComponent />
            </div>

            <div className="piechart1">
                <Graph />
            </div>

            <div className="pane1">
                <Pane />
            </div>

            <div className="pane2">
                <Pane />
            </div>

            <div className="footer">
                <img src="sofHare_bianco.png" alt="logo_white" width="60"/>
            </div>

        </div>
    </div>

    );
}


export default App;




