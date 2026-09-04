import { useState } from 'react'
import MapViewOsm from './content-elements/Map/MapViewOsm'
import GridView from './content-elements/List/GridView'

const MapExplorer = ({items}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const handleHover = (id) => {
    setHoveredItemId(id)
  }

  const handleClick = (id) => {
      setSelectedItemId(
        id !== selectedItemId ? id : null
      )
      setHoveredItemId(id !== selectedItemId ? id : null)
  }

  return (
    <div className="container event-explorer">
      <h1>Explore Air-Racing events</h1>
      <div className="map" aria-labelledby="map-heading">
          <MapViewOsm
            title="Air Race locations on map"
            markers={items}
            highlightedMarkerId={hoveredItemId}
            expandedMarkerId={selectedItemId}
            onMarkerClick={handleClick}
            onMarkerHover={handleHover}
          />
      </div>

      <div className="event-list" aria-labelledby="grid-heading">

        <GridView
          title="Air Racing Events"
          items={items}
          highlightedItemId={selectedItemId}
          onItemHover={handleHover}
          onItemClick={handleClick}
        />
      </div>
    </div>
  )
}

export default MapExplorer
