import { useId, useMemo, useState, type ReactNode } from 'react'
import { Map, Marker, Overlay } from 'pigeon-maps'
import { osm } from 'pigeon-maps/providers'
import type { Coordinates, LocationId, LocationItemState } from './types/locations'

export interface LocationsMapProps<T> {
  items: readonly T[]
  getId: (item: T) => LocationId
  getCoordinates: (item: T) => Coordinates
  renderListItem: (item: T, state: LocationItemState) => ReactNode
  renderPopup?: (item: T) => ReactNode
  selectedId?: LocationId | null
  defaultSelectedId?: LocationId | null
  onSelectedChange?: (id: LocationId | null, item: T | null) => void
  onItemHover?: (item: T | null) => void
  title?: ReactNode
  listLabel?: string
  mapLabel?: string
  height?: number
  defaultCenter?: Coordinates
  defaultZoom?: number
  className?: string
  emptyMessage?: ReactNode
}

const DEFAULT_CENTER: Coordinates = [50, 8]

export function LocationsMap<T>({
  items,
  getId,
  getCoordinates,
  renderListItem,
  renderPopup,
  selectedId: controlledSelectedId,
  defaultSelectedId = null,
  onSelectedChange,
  onItemHover,
  title,
  listLabel = 'Locations',
  mapLabel = 'Locations on map',
  height = 475,
  defaultCenter = DEFAULT_CENTER,
  defaultZoom = 4,
  className,
  emptyMessage = 'No locations to display.',
}: LocationsMapProps<T>) {
  const [uncontrolledSelectedId, setUncontrolledSelectedId] = useState<LocationId | null>(defaultSelectedId)
  const [hoveredId, setHoveredId] = useState<LocationId | null>(null)
  const headingId = useId()
  const selectedId = controlledSelectedId === undefined ? uncontrolledSelectedId : controlledSelectedId

  const selectedItem = useMemo(
    () => items.find((item) => getId(item) === selectedId) ?? null,
    [getId, items, selectedId],
  )

  const setHoveredItem = (item: T | null) => {
    setHoveredId(item ? getId(item) : null)
    onItemHover?.(item)
  }

  const selectItem = (item: T) => {
    const id = getId(item)
    const nextId = selectedId === id ? null : id
    if (controlledSelectedId === undefined) setUncontrolledSelectedId(nextId)
    onSelectedChange?.(nextId, nextId === null ? null : item)
  }

  const activeId = hoveredId ?? selectedId
  const rootClassName = ['locations-map', className].filter(Boolean).join(' ')

  return (
    <section className={rootClassName} aria-labelledby={title ? headingId : undefined}>
      {title && <h2 id={headingId} className="locations-map__title">{title}</h2>}

      <figure className="locations-map__figure">
        <Map
          provider={osm}
          height={height}
          defaultCenter={[...defaultCenter]}
          defaultZoom={defaultZoom}
          metaWheelZoom={false}
          twoFingerDrag={false}
        >
          {items.map((item) => {
            const id = getId(item)
            return (
              <Marker
                key={id}
                anchor={[...getCoordinates(item)]}
                color={activeId === id ? '#d92d20' : '#2c7da0'}
                width={42}
                onMouseOver={() => setHoveredItem(item)}
                onMouseOut={() => setHoveredItem(null)}
                onClick={() => selectItem(item)}
              />
            )
          })}

          {selectedItem && renderPopup && (
            <Overlay anchor={[...getCoordinates(selectedItem)]} offset={[0, 24]}>
              <div className="locations-map__popup">{renderPopup(selectedItem)}</div>
            </Overlay>
          )}
        </Map>
        <figcaption className="locations-map__visually-hidden">{mapLabel}</figcaption>
      </figure>

      <div className="locations-map__list" aria-label={listLabel}>
        {items.length === 0 ? <p>{emptyMessage}</p> : (
          <ul>
            {items.map((item) => {
              const id = getId(item)
              const state = { hovered: hoveredId === id, selected: selectedId === id }
              return (
                <li key={id}>
                  <button
                    type="button"
                    className={`locations-map__item${activeId === id ? ' locations-map__item--active' : ''}`}
                    aria-pressed={state.selected}
                    onPointerEnter={() => setHoveredItem(item)}
                    onPointerLeave={() => setHoveredItem(null)}
                    onPointerDown={(event) => {
                      if (event.pointerType === 'touch') setHoveredItem(item)
                    }}
                    onClick={() => selectItem(item)}
                  >
                    {renderListItem(item, state)}
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </section>
  )
}
