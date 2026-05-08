import { useState, useCallback, useMemo } from 'react'
import MapView from './content-elements/MapView'
import SimpleGrid from './content-elements/SimpleGrid'
import FilterBar from './content-elements/FilterBar'
import DropdownInput from './atoms/DropdownInput'

// Data from JSON file.
import dataRows from '../assets/air_race_data.json'

const EventExplorer = () => {
  const [hoveredEventId, setHoveredEventId] = useState(null)
  const [selectedEventId, setSelectedEventId] = useState(null)

  const [rowFilter, setRowFilter] = useState({
    category: null,
    // country: null,
  });

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

  // Apply enabled filters to dataset.
  const filteredRows = useMemo(
    () => dataRows.filter(
      row => rowFilter.category === null ? true : row.category === rowFilter.category
    ), [rowFilter])

  const updateFilter = (field, value) => {
    setSelectedEventId(null)
    setHoveredEventId(null)

    setRowFilter(rowFilter && {[field]: value})
  }

  const categoryOpts = ['all',
    ...new Set(dataRows.map(row => row.category))
  ];

  // Updates filter by category.
  const updateCategoryFilter = (value) => {
    if (value === 'all') {
      updateFilter('category', null);
      return;
    }
    updateFilter('category', value);
  }

  return (
    <section className="container event-explorer">
      <h1>Explore Air-Racing events</h1>
      <div className="map" aria-labelledby="map-heading">
          <MapView
            title="Air Race locations on map"
            markers={filteredRows}
            highlightedMarkerId={hoveredEventId}
            expandedMarkerId={selectedEventId}
            onMarkerClick={handleClick}
            onMarkerHover={handleHover}
          />
      </div>

      <div className="event-list" aria-labelledby="grid-heading">

        <FilterBar rowFilter={rowFilter}>
          <DropdownInput name="category-filter" label="Category" options={categoryOpts} onChange={updateCategoryFilter}/>
        </FilterBar>

        <SimpleGrid
          title="Air Racing Events"
          items={filteredRows}
          highlightedItemId={selectedEventId}
          onItemHover={handleHover}
          onItemClick={handleClick}
        />
      </div>
    </section>
  )
}

export default EventExplorer
