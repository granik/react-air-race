# @granik/react-locations-map

TypeScript React component that keeps map markers and a list of locations in sync.

```bash
npm install @granik/react-locations-map pigeon-maps
```

```tsx
import { LocationsMap } from '@granik/react-locations-map'
import '@granik/react-locations-map/style.css'

type Office = {
  uuid: string
  name: string
  geo: { lat: number; lng: number }
  city: string
}

export function Offices({ offices }: { offices: Office[] }) {
  return (
    <LocationsMap
      items={offices}
      getId={(office) => office.uuid}
      getCoordinates={(office) => [office.geo.lat, office.geo.lng]}
      renderListItem={(office) => <><strong>{office.name}</strong><div>{office.city}</div></>}
      renderPopup={(office) => <strong>{office.name}</strong>}
    />
  )
}
```

`items` can contain any data shape. The required `getId` and `getCoordinates` callbacks tell the component how to identify and place an item; `renderListItem` and `renderPopup` give the consuming application full control over displayed content.

The selected item can be controlled with `selectedId` and `onSelectedChange`, or left uncontrolled with `defaultSelectedId`.

## Development

```bash
npm install
npm run dev       # demo application
npm run build     # ESM package, styles, and .d.ts files in dist/
npm run lint
```
