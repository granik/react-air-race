import classNames from "classnames"

import './grid.scss'

// @todo
// keyboard tab accecibility
// 

const Grid = ({title, items, footer, highlightedItemId, onItemHover, onItemClick}) => (
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
            aria-current={highlightedItemId === item.id ? 'marker' : undefined}
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

export default Grid
