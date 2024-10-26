/* eslint-disable react/prop-types */
import { useState } from "react";
import httpReq from '../utils/httpReq';
import DatePickerWidget from '../utils/DatePickerWidget.jsx'; 
import '../CSS/GroceryItem.css'; 

function GroceryItem({ itemMap, dispatch, viewMode }) {
  const [isUpdateMode, setIsUpdateMode] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(itemMap.date)); 
  const [currentName, setCurrentName] = useState(itemMap.name); 

  function handleDoubleClick() {
    setIsUpdateMode(true);
  }

  function handleBlur() {
    setIsUpdateMode(false);
  }

  function handleKeyDown(event) {
    let key_name = event.key,
      input_value,
      item_id;

    if (key_name === 'Enter') {
      input_value = event.target.value;
      item_id = itemMap.id;

      httpReq('post', '/item/update/' + item_id, { name: input_value, date: selectedDate })
        .then(() => {
          dispatch({
            type: 'update',
            body: {
              id: item_id,
              name: input_value,
              date: selectedDate
            },
          });          
        })
        .catch(error => {
          console.error(error);
        });
      setCurrentName(input_value);
      setIsUpdateMode(false);
    }
  }

  function handleClickRemove() {
    httpReq('get', '/item/delete/' + itemMap.id)
      .then(() => {
        dispatch({
          type: 'remove',
          body: { id: itemMap.id }
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  function toggleCalendar() {
    setIsCalendarOpen(!isCalendarOpen);
  }

  function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
  
  function handleDateChange(date) {
    const item_id = itemMap.id;
    const formattedDate = date.toISOString().split('T')[0];

    httpReq('post', '/item/update/' + item_id, { name: currentName, date: selectedDate })
      .then(() => {
        dispatch({
          type: 'update',
          body: {
            id: item_id,
            name: currentName, 
            date: formattedDate,
          },
        });
        setSelectedDate(date);  
        setIsCalendarOpen(false);
      })
      .catch(error => {
        console.error(error);
      });
    }
    
  return (
    <li className="grocery-item">
      <label 
        className="item-label"
        onDoubleClick={handleDoubleClick}
      >
        {itemMap.name}
      </label>
      {viewMode === "all" && <label 
        className="item-date"
      >
        {formatDate(new Date(itemMap.date))} 
      </label>
      }

      {isUpdateMode && (
        <input
          className="edit-input"
          defaultValue={itemMap.name}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          autoFocus
        />
      )}
      {viewMode === 'byDate' && (
        <div className="calendar-container">
          <DatePickerWidget
            selectedDate={selectedDate}
            onChange={handleDateChange}
            isOpen={isCalendarOpen} 
            toggleCalendar={toggleCalendar}
          />
        </div>
      )}
      <button
        className="remove-btn"
        onClick={handleClickRemove}
      ></button>
    </li>
  );
}

export default GroceryItem;
