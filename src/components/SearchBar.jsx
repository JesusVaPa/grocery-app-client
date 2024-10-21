import { useState } from 'react';
import '../CSS/SearchBar.css';
import httpReq from '../utils/httpReq';
import DatePickerComponent from '../utils/DatePickerWidget.jsx'; 

// eslint-disable-next-line react/prop-types
function SearchBar({ dispatch }) {
  const [inputValue, setInputValue] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); 
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); 

  function handleKeyDown(event) {
    let key_name = event.key;

    if (key_name === 'Enter') {
      httpReq('post', '/item/create', { name: inputValue, date: selectedDate }) 
        .then(item_map => {
          dispatch({
            type: 'add',
            body: item_map
          });
        })
        .catch(error => {
          console.error(error);
        });

      setInputValue('');
      setSelectedDate(new Date()); 
    }
  }

  return (
    <div className="search-bar-container"> 
      <input
        className="search-bar"
        type="text"
        placeholder="What would you like to buy?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <div className="date-picker-wrapper">
        <span className="date-label">And when?...</span>
        <DatePickerComponent
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          isOpen={isCalendarOpen}
          toggleCalendar={() => setIsCalendarOpen(!isCalendarOpen)}
        />
        {selectedDate && (
          <span className="date-selected">
            {selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}        
          </span>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
