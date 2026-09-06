import { useState } from "react";
import { Map, List } from "@components/content-elements";

const MapExplorer = ({
  markers,
  selectedId,
  defaultSelectedId = null,
  title,
  listLabel = null,
  height = 400,
  defaultCenter = [50.0, 8.0],
  defaultZoom = 4,
  // className,
  getMarkerId,
  getMarkerCoords,
  renderListItem,
  renderMarkerPopup,
  onItemClick,
  onItemHover,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(
    selectedId || defaultSelectedId,
  );

  const handleHover = (event, itemId) => {
    setHoveredItemId(itemId);
    /* eslint-disable-next-line no-unused-expressions */
    onItemHover && onItemHover(event);
  };

  const handleClick = (event, itemId) => {
    setSelectedItemId(itemId !== selectedItemId ? itemId : null);
    setHoveredItemId(itemId !== selectedItemId ? itemId : null);
    /* eslint-disable-next-line no-unused-expressions */
    onItemClick && onItemClick(event);
  };

  return (
    <div className="container event-explorer">
      <div className="map" aria-labelledby="map-heading">
        <Map
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          title={title}
          markers={markers}
          height={height}
          highlightedMarkerId={hoveredItemId}
          expandedMarkerId={selectedItemId}
          onMarkerClick={handleClick}
          onMarkerHover={handleHover}
          getMarkerId={getMarkerId}
          getMarkerCoords={getMarkerCoords}
          renderMarkerPopup={renderMarkerPopup}
        />
      </div>

      <div className="event-list" aria-labelledby="grid-heading">
        <List
          title={listLabel}
          items={markers}
          highlightedItemId={selectedItemId}
          onItemHover={handleHover}
          onItemClick={handleClick}
          renderListItem={renderListItem}
          getMarkerId={getMarkerId}
        />
      </div>
    </div>
  );
};

export default MapExplorer;
