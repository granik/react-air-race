import classNames from "classnames"

// @todo
// keyboard tab accecibility
// 

const SimpleGrid = ({title, items, highlightedItemId, onItemHover, onItemClick}) => {
  return (
    <section className="simple-grid" aria-labelledby="grid-title">
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
              <div className="item-title">{item.title}</div>

              <div className="item-text">
                {item.description}
              </div>

              <div className="item-footer">Country: {item.country}, Category: {item.category}</div>

            </button>

          </li>
        ))}
      </ul>
    </section>
  )
}

export default SimpleGrid
