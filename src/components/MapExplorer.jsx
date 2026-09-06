import { useState } from 'react'
import OsmMap from '@components/content-elements/Map/OsmMap'
import { Grid } from '@components/content-elements/ListView'

const MapExplorer = ({
  markers,
  selectedId,
  defaultSelectedId = null,
  title,
  listLabel = null,
  height = 400,
  defaultCenter = [50.0000, 8.000],
  defaultZoom = 4,
  // className,
  getMarkerId,
  getMarkerCoords,
  renderListItem,
  renderMarkerPopup,
  onItemClick,
  onItemHover,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(selectedId || defaultSelectedId)

  const handleHover = (event, itemId) => {
    setHoveredItemId(itemId)
    onItemHover && onItemHover(event)
  }

  const handleClick = (event, itemId) => {
      setSelectedItemId(
        itemId !== selectedItemId ? itemId : null
      )
      setHoveredItemId(itemId !== selectedItemId ? itemId : null)
      onItemClick && onItemClick(event)
  }

  return (
    <div className="container event-explorer">
      <div className="map" aria-labelledby="map-heading">
          <OsmMap
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
        <Grid
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
  )
}

export default MapExplorer
