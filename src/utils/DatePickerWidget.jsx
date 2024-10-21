/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaCalendarAlt } from 'react-icons/fa';
import '../css/DatePickerWidget.css'; 

function DatePickerWidget({ selectedDate, onChange, isOpen, toggleCalendar }) {
  return (
    <div className="date-picker-container">
      <button
        onClick={toggleCalendar}
        style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: '10px' }}
      >
        <FaCalendarAlt size={24} />
      </button>
      {isOpen && (
        <div className="calendar-overlay">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              onChange(date);
              toggleCalendar(); 
            }}
            dateFormat="dd/MM/yyyy"
            inline
          />
        </div>
      )}
    </div>
  );
}

export default DatePickerWidget;
