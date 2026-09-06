import { Map, Marker, Overlay as MarkerPopup } from "pigeon-maps";
import * as providers from "pigeon-maps/providers";

import "./osm-map.scss";

const OsmMap = ({
  title,
  markers,
  highlightedMarkerId,
  highlightColor = "#ff0000",
  expandedMarkerId,
  mapsProvider = "osm",
  onMarkerClick,
  onMarkerHover,
  defaultCenter,
  defaultZoom = 3,
  metaWheelZoom = false,
  twoFingerDrag = false,
  height = 300,
  markerWidth = 40,
  popupOffset = [0, 30],
  renderMarkerPopup,
  getMarkerId,
  getMarkerCoords,
}) => {
  const provider = providers[mapsProvider] ?? providers.osm;
  const expandedMarker = markers.find(
    (marker) => getMarkerId(marker) === expandedMarkerId,
  );

  return (
    <figure className="mapView">
      <Map
        provider={provider}
        height={height}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        onClick={(e) => onMarkerClick(e, null)}
        metaWheelZoom={metaWheelZoom}
        twoFingerDrag={twoFingerDrag}
      >
        {markers &&
          markers.map((marker) => (
            <Marker
              key={getMarkerId(marker)}
              color={
                highlightedMarkerId === getMarkerId(marker) && highlightColor
              }
              width={markerWidth}
              anchor={getMarkerCoords(marker)}
              payload={getMarkerId(marker)}
              onMouseOver={(e) => onMarkerHover(e, getMarkerId(marker))}
              onClick={(e) => onMarkerClick(e, getMarkerId(marker))}
            />
          ))}

        {expandedMarker && (
          <MarkerPopup
            anchor={getMarkerCoords(expandedMarker)}
            offset={popupOffset}
          >
            <div className="popupContent">
              {renderMarkerPopup(expandedMarker)}
            </div>
          </MarkerPopup>
        )}
      </Map>
      <figcaption>{title}</figcaption>
    </figure>
  );
};

export default OsmMap;
