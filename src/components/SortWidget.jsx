// eslint-disable-next-line no-unused-vars
import React from 'react';

// eslint-disable-next-line react/prop-types
function SortWidget({ onSortChange }) {
  return (
    <div className="sort-widget">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort" onChange={(e) => onSortChange(e.target.value)}>
        <option value="alphabetical">Alphabetically</option>
        <option value="date-asc">Date Ascending</option>
        <option value="date-desc">Date Descending</option>
      </select>
    </div>
  );
}

export default SortWidget;
