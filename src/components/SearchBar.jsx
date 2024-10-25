import { useState } from 'react';
import '../css/SearchBar.css';
import httpReq from '../utils/httpReq';

// eslint-disable-next-line react/prop-types
function SearchBar({ dispatch, setViewMode, setFilterText }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewOption, setViewOption] = useState('byDate');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      httpReq('post', '/item/create', { name: inputValue, date: selectedDate })
        .then(item_map => {
          dispatch({ type: 'add', body: item_map });
          resetFields(); 
        })
        .catch(console.error);
    }
  };

  const handleViewChange = (event) => {
    const newView = event.target.value;
    setViewOption(newView); 
    setViewMode(newView); 
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value); 
  };

  const resetFields = () => {
    setInputValue('');
    setSelectedDate(new Date());
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          className="search-bar"
          type="text"
          placeholder="What would you like to buy?"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown} 
        />       
      </div>
      <div className="view-selector">
        <label htmlFor="view">View:</label>
        <select id="view" value={viewOption} onChange={handleViewChange}>
          <option value="all">All Items</option>
          <option value="byDate">By Date</option>
        </select>
        <input
          type="text"
          placeholder="Filter items..."
          onChange={handleFilterChange}
          className="filter-input"
        />
      </div>
    </>
  );
}

export default SearchBar;
