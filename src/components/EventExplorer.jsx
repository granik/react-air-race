import { useState, useCallback } from 'react'
import MapView from './MapView'
import SimpleGrid from './SimpleGrid'

import dataRows from '../assets/air_race_data.json'

const EventExplorer = () => {
  const [hoveredEventId, setHoveredEventId] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState(null)

  // const [eventData, setEventData] = useState([])

  /*
  useEffect(() => {
    fetch('http://localhost:3000/events/all')
    setEventData(data)
  }, []);
  */

  const handleHover = (id) => {
    setHoveredEventId(id)
  }

  const handleClick = useCallback((id) => {
      setSelectedEventId(
        id !== selectedEventId ? id : null
      )
      setHoveredEventId(id)
  }, [selectedEventId])

  return (
    <section className="container event-explorer">
      <div className="map" aria-labelledby="map-heading">
          <MapView
            title="Air Race locations on map"
            markers={dataRows}
            highlightedMarkerId={hoveredEventId}
            expandedMarkerId={selectedEventId}
            onMarkerClick={handleClick}
            onMarkerHover={handleHover}
          />
      </div>

      <div className="event-list" aria-labelledby="grid-heading">
        <SimpleGrid
          title="Air Racing Events"
          items={dataRows}
          highlightedItemId={selectedEventId}
          onItemHover={handleHover}
          onItemClick={handleClick}
        />
      </div>
    </section>
  )
}

export default EventExplorer
