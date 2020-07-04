
import leaflet from 'leaflet'

function createMap(elem) {
  const map = leaflet.map(elem).setView([44.96729, -93.29394],12)
  const mapboxTiles = leaflet.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    maxZoom: 18,
    id: 'mapbox/outdoors-v11',
    tileSize: 512,
    zoomOffset: -1,
  })

  mapboxTiles.addTo(map)


  const state = {
    markers: new Set()
  }

  return {
    addMarker(lat, lng, { title, onClick } = {}) {
      const mkr = leaflet.marker([lat, lng])
      mkr.on('click', onClick)
      mkr.bindTooltip(title)
      mkr.addTo(map)
      state.markers.add(mkr)
    },
    clearMarkers() {
      const markers = [...state.markers.keys()]
      for (let i = 0; i < markers.length; i++) {
        const marker = markers[i]
        marker.removeFrom(map)
        state.markers.delete(marker)
      }
    }
  }
}


export default (ctx, inject) => {

  inject('createMap', createMap)
}