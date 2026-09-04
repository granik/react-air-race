import { LocationsMap } from './LocationsMap'
import dataRows from './assets/air_race_data.json'

type AirRace = (typeof dataRows)[number]

export default function App() {
  return (
    <main className="demo">
      <h1>Air-racing events</h1>
      <LocationsMap<AirRace>
        items={dataRows}
        title="Explore locations"
        getId={(event) => event.id}
        getCoordinates={(event) => event.coordinates as [number, number]}
        renderListItem={(event) => (
          <>
            <strong>{event.title}</strong>
            <span>{event.description}</span>
            <small>{event.address}</small>
          </>
        )}
        renderPopup={(event) => (
          <>
            <strong>{event.title}</strong>
            <p>{event.address}</p>
          </>
        )}
      />
    </main>
  )
}
