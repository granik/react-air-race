const FilterBar = ({ rowFilter, onReset, children }) => {
  // eslint-disable-next-line no-unused-vars
  const activeFiltersCount = Object.entries(rowFilter).filter(([key, value]) => !!value).length;
  
  return (
    <div className="filter-bar">
      <div className="filter-bar-filters">
        {children}
      </div>
      {onReset && activeFiltersCount > 0 && (
          <button 
            onClick={onReset}
            className="filter-reset-button"
            type="button"
          >
            Reset
          </button>
        )}
    </div>
  );
}

export default FilterBar;
