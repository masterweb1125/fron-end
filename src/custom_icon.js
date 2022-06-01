import L from 'leaflet';
import marker_cpt  from './static/Icons/icon_cpt.png'
import marker_cptu from './static/Icons/icon_cptu.png'
import marker_cpte from './static/Icons/icon_cpte.png'

const myIconCPT = new L.Icon({
    iconUrl: marker_cpt,
    iconRetinaUrl: marker_cpt,
    popupAnchor:  [-0, -0],
    iconSize: [40,50],
});

const myIconCPTU = new L.Icon({
    iconUrl: marker_cptu,
    iconRetinaUrl: marker_cptu,
    popupAnchor:  [-0, -0],
    iconSize: [40,50],
});

const myIconCPTE = new L.Icon({
    iconUrl: marker_cpte,
    iconRetinaUrl: marker_cptu,
    popupAnchor:  [-0, -0],
    iconSize: [40,50],
});

export { myIconCPT, myIconCPTU,  myIconCPTE };