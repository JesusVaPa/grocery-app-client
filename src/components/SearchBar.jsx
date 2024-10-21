import { useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa';  
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../CSS/SearchBar.css';
import httpReq from '../utils/httpReq';

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
        placeholder="What would you like to buy today?"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}  
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
      >
        <FaCalendarAlt size={24} /> 
      </button>
      {selectedDate && (
        <span style={{ marginLeft: '10px' }}>
          {selectedDate.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })}        
        </span>
      )}
      {isCalendarOpen && (
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setIsCalendarOpen(false);  
          }}
          dateFormat="dd/MM/yyyy"
          inline 
        />
      )}
    </div>
  );
}

export default SearchBar;
