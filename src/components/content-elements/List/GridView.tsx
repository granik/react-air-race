import classNames from "classnames"
import type { ReactNode } from 'react'
import type { LocationId } from '../../../types/locations'
import type { MapLocation } from '../../../types/map-location'

import './grid.scss'

// @todo
// keyboard tab accecibility
// 

interface GridViewProps {
  title: string
  items: readonly MapLocation[]
  footer?: ReactNode
  highlightedItemId: LocationId | null
  onItemHover: (id: LocationId | null) => void
  onItemClick: (id: LocationId) => void
}

const GridView = ({title, items, footer, highlightedItemId, onItemHover, onItemClick}: GridViewProps) => (
  <div className="simple-grid" aria-labelledby="grid-title">
    <h2 id="grid-title">{title}</h2>
    <ul className="simple-grid-items">
      
      {items.map(item => (
        <li key={item.id}>

          <button
            className={classNames(
              'grid-item',
              {'grid-item--highlighted': highlightedItemId === item.id}
            )}
            onMouseOver={() => onItemHover(item.id)}
            onMouseOut={() => onItemHover(highlightedItemId)}
            onClick={() => onItemClick(item.id)}
            type="button"
              aria-current={highlightedItemId === item.id ? 'location' : undefined}
          >
            <div className="item-title">
              {item.title}
            </div>

            <div className="item-text">
              {item.description}
            </div>

            {!!footer && <div className="item-footer">
              {footer}
            </div>}

          </button>

        </li>
      ))}
    </ul>
  </div>
)

export default GridView
