import MapExplorer from '@components/MapExplorer'

// Data from JSON file.
import dataRows from './assets/air_race_data.json'

function App() {

  return (
     <MapExplorer 
        markers={dataRows}
        title="Air Race in Austria"
        getMarkerId = {m => m.id}
        getMarkerCoords = {m => m.coordinates}
        renderMarkerPopup = {m => 
        <>
          <p><strong>{m.title}</strong></p>
          <p>{m.description}</p>
        </>}
        renderListItem = {m => 
        <>
          <div className="item-title">
            {m.title}
          </div>
          <div className="item-text">
            {m.description}
          </div>
        </>}
     />
  )
}

export default App
