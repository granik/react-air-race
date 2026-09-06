import classNames from "classnames";

import "./list.scss";

// @todo
// keyboard tab accecibility
// h2 -> make configurable

const List = ({
  title,
  items,
  highlightedItemId,
  onItemHover,
  onItemClick,
  getMarkerId,
  renderListItem,
}) => (
  <div className="simple-grid" aria-labelledby="grid-title">
    <h2 id="grid-title">{title}</h2>
    <ul className="simple-grid-items">
      {items.map((item) => (
        <li key={getMarkerId(item)}>
          <button
            className={classNames("grid-item", {
              "grid-item--highlighted": highlightedItemId === getMarkerId(item),
            })}
            onMouseOver={(e) => onItemHover(e, getMarkerId(item))}
            onFocus={(e) => onItemHover(e, getMarkerId(item))}
            onMouseOut={(e) => onItemHover(e, highlightedItemId)}
            onBlur={(e) => onItemHover(e, highlightedItemId)}
            onClick={(e) => onItemClick(e, getMarkerId(item))}
            type="button"
            aria-current={
              highlightedItemId === getMarkerId(item) ? "marker" : undefined
            }
          >
            {renderListItem(item)}
          </button>
        </li>
      ))}
    </ul>
  </div>
);

export default List;
