import { MapContainer, Marker, Popup, TileLayer,ZoomControl, LayersControl,LayerGroup  } from 'react-leaflet'
import axios from 'axios';
import React, { useState,useRef } from 'react'
//import { geosearch } from 'esri-leaflet-geocoder';
import 'esri-leaflet-geocoder/dist/esri-leaflet-geocoder.css';
import Wkt from 'wicket';
import {  myIconCPT, myIconCPTU,myIconCPTE  } from '../custom_icon';
import LeafletRuler from "../LeafletRuler";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css";
//import style from './MapComponent.css';



//axios.post(`https://dj-pm.herokuapp.com/api/proves/`,{parameter1:"value1"})
//.then(res => {
//})

//in parameter 1 inser data che si desidera



function viewDataCPT(e){
  let id=e.target.attributes[0].nodeValue
  console.log(id)
  axios.get(`https://dj-pm.herokuapp.com/outcpt/proves/`)
  //axios.get(`http://127.0.0.1:8000/api/proves/`)
  .then(res => {
    var json = res.data.find(item => item.id == id);
    var newStr = json.output_data.replaceAll('\'', "\"");
    var jsonnewStr = JSON.parse(newStr);
    var par1=jsonnewStr[0].QC;
    var prof=jsonnewStr[0].H;

  })
}


function downloadJson(e){
  let id=e.target.attributes[0].nodeValue
  console.log(id)
  axios.get(`https://dj-pm.herokuapp.com/inputcpt/proves/`)
  //axios.get(`http://127.0.0.1:8000/api/proves/`)
  .then(res => {
    var json = res.data.find(item => item.id == id);
    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(json));
    var dlAnchorElem = document.getElementById('downloadAnchorElem');
    dlAnchorElem.setAttribute("href",     dataStr     );
    console.log(id)
    dlAnchorElem.setAttribute("download", "input-"+id+"__RX.json");
    dlAnchorElem.click();
  })
}



export const MapComponent = ({ positionDefault = [44.36, 11.34] }) => {
  const [geopoints, setGeopoints] = useState([]);
  const [check_geog, setCheck] = useState(true);
  const [check_cpt, setCheck_cpt] = useState(true);
  const [check_cptu, setCheck_cptu] = useState(true);
  const [check_cpte, setCheck_cpte] = useState(true);

  const mapRef = useRef();
  const addLayers = (e) => {
    if(e.target.name=='prove_geog'){
        setCheck_cpt(e.target.checked);
        setCheck_cptu(e.target.checked);
        setCheck_cpte(e.target.checked);
        setCheck(e.target.checked);
    }
    if(e.target.name=='prove_cpt'){
        setCheck_cpt(e.target.checked);
    }
    if(e.target.name=='prove_cptu'){
        setCheck_cptu(e.target.checked);
    }
    if(e.target.name=='prove_cpte'){
        setCheck_cpte(e.target.checked);
    }
  };

  if(!geopoints.length) {
    axios.get(`https://dj-pm.herokuapp.com/datacpt/proves/`)
    //axios.get(`http://127.0.0.1:8000/api/proves/`)
    .then(res => {
      const newdata = res.data.map(item => {
      const wkt_geom = item.geom.replace('SRID=4326;','')
      const wkt = new Wkt.Wkt();
      wkt.read(wkt_geom)
      const geojson_geom = wkt.toJson()
      const coords2 = geojson_geom['coordinates']
        //console.log(coords2)
        //const geomsplit = item.geom.split(' ');
        //console.log(geomsplit)
        //const coords = [parseFloat(geomsplit[2].substr(0, geomsplit[2].length-1)), parseFloat(geomsplit[1].substring(1))];
        //console.log(coords)
      return {coords: coords2, id: item.id, tipo:item.tipo_prova};
      });
      setGeopoints(newdata);
    })
  }

 return (

        <div className="general">
            <div className='map1'>
            <a href="/#" id="downloadAnchorElem" style={{ display:"none" }} >a</a>
                <MapContainer  center={positionDefault} zoom={10} zoomControl={false} inneRef={mapRef} style={{ height: '500px', width: '100%',borderRadius: '7px'}}>
                    <LayersControl position="topright">
                        <LayersControl.BaseLayer checked name="OpenStreetMap">
                            <TileLayer
                                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                                attribution='&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors'
                            />
                        </LayersControl.BaseLayer>

                        <LayersControl.BaseLayer unchecked name="Satellite ESRI">
                            <TileLayer
                                url='https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
                                attribution='Map Tiles © 2022 Esri, Maxar, Earthstar Geographics, CNES/Airbus DS, USDA FSA, USGS,Getmapping, Aerogrid, IGN, IGP, and the GIS User Community'
                            />
                        </LayersControl.BaseLayer>
                       <div >
                            <LayerGroup  >
                              <MarkerClusterGroup showCoverageOnHover={false} >
                               {
                                geopoints.filter((point,i) =>
                                    (check_cpt==true&&point.tipo=='CPT')||(check_cptu==true&&point.tipo=='CPTU')||(check_cpte==true&&point.tipo=='CPTE')
                                ).map(function(point, i){
                                    var myIcon;
                                    if(point.tipo=='CPT'){
                                        myIcon=myIconCPT;
                                    }
                                    else if(point.tipo=='CPTE'){
                                        myIcon=myIconCPTE;
                                        }
                                    else{
                                        myIcon=myIconCPTU;
                                    }
                                    return (<Marker key={i} position={[point.coords[1], point.coords[0]]} icon={myIcon}>
                                       <Popup>
                                           ID : {point.id}  <br></br>
                                           Tipologia: {point.tipo}
                                           <br>
                                           </br>
                                           <button  onClick={viewDataCPT} point-id={point.id} type="button" style={{'fontFamily':'roboto','fontSize': '11px',border:'2px solid #12455b',color: 'black',padding: '5px 25px',cursor: 'pointer','borderRadius': '12px','backgroundColor': 'white','marginTop': '2px'}}>View data</button>
                                           <br>
                                           </br>
                                           <button  onClick={downloadJson} point-id={point.id} type="button" style={{'fontFamily':'roboto','fontSize': '11px',border:'2px solid #12455b',color: 'black',padding: '5px 13px',cursor: 'pointer','borderRadius': '12px','backgroundColor': 'white','marginTop': '3px'}}>Download data</button>
                                       </Popup>
                                     </Marker>);
                                    }
                                )};
                              </MarkerClusterGroup>
                            </LayerGroup>
                      </div>
                      </LayersControl>
                    <ZoomControl position='topleft'/>
                    <LeafletRuler />
                </MapContainer>

            </div>
            <div className="layertab">
                  <table>
                      <tbody>
                            <tr>
                              <th>Layer</th>
                            </tr>

                            <tr>
                              <td><input type="checkbox" checked={check_geog} onChange={addLayers}  name="prove_geog" /></td>
                              <td>Prove geognostiche</td>
                              <td><a href="https://dashboard.heroku.com/apps/dj-pm" target="_blank" rel="noreferrer">

                                  </a>
                              </td>
                            </tr>

                            <tr>
                              <td><input type="checkbox" checked={check_cpt} onChange={addLayers}  name="prove_cpt" /></td>
                              <td>Prove CPT</td>
                              <td><a href="https://it.wikipedia.org/wiki/Prova_penetrometrica_statica" target="_blank" rel="noreferrer">
                                    <img src="/icon_cpt.png" height="35" alt="image_cpt"/>
                                  </a>
                              </td>
                            </tr>

                            <tr>
                              <td><input type="checkbox" checked={check_cptu} onChange={addLayers}  name="prove_cptu" /></td>
                              <td>Prove CPTU</td>
                              <td><a href="https://it.wikipedia.org/wiki/Prova_penetrometrica_statica" target="_blank" rel="noreferrer">
                                    <img src="/icon_cptu.png" height="35" alt="image_cptu"/>
                                  </a>
                              </td>
                            </tr>

                            <tr>
                              <td><input type="checkbox" checked={check_cpte} onChange={addLayers}  name="prove_cpte" /></td>
                              <td>Prove CPTE</td>
                              <td><a href="https://it.wikipedia.org/wiki/Prova_penetrometrica_statica" target="_blank" rel="noreferrer">
                                    <img src="/icon_cpte.png" height="35" alt="image_cpte"/>
                                  </a>
                              </td>
                            </tr>

                      </tbody>
                  </table>
            </div>
        </div>

  )

}