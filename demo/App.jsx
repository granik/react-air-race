import MapExplorer from '@components/MapExplorer'

// Data from JSON file.
import dataRows from './assets/air_race_data.json'

function App() {

  return (
     <MapExplorer items={dataRows}/>
  )
}

export default App
