import L from 'leaflet';
import marker from './static/Icons/icon_spin.png'

const myIcon = new L.Icon({
    iconUrl: marker,
    iconRetinaUrl: marker,
    popupAnchor:  [-0, -0],
    iconSize: [20,20],
});

export { myIcon };