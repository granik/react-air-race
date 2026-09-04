import { Map, Marker, Overlay as MarkerDetails } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'

import './map.scss'

const MapViewOsm = ({ title, markers, highlightedMarkerId, expandedMarkerId, onMarkerClick, onMarkerHover, centerCoords = [50.0000, 8.000] }) => {

  const expandedMarker = markers.find(marker => marker.id === expandedMarkerId)

  return (
    <figure className='mapView'>
      <Map
        provider={osm}
        height={475}
        defaultCenter={centerCoords}
        defaultZoom={4}
        onClick={onMarkerClick}
        metaWheelZoom={false}
        twoFingerDrag={false}
      >
        {markers && (markers.map(marker =>
          <Marker key={marker.id}
            color={highlightedMarkerId === marker.id && '#ff0000'}
            width={50}
            anchor={marker.coordinates}
            payload={marker.id}
            onMouseOver={() => onMarkerHover(marker.id)}
            onClick={() => onMarkerClick(marker.id)}
          />)
        )}

        {expandedMarker && (
          <MarkerDetails anchor={expandedMarker.coordinates} offset={[0, 30]}>
            <div className="popupContent">
              <p><strong>{expandedMarker.title}</strong></p>
              <p>{expandedMarker.description}</p>
            </div>
          </MarkerDetails>
        )}
      </Map>
      <figcaption>{title}</figcaption>
    </figure>
  )
}

export default MapViewOsm
