import { useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import httpReq from './utils/httpReq';
import './App.css';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';

function App() {
  const [itemList, dispatch] = useReducer(reducer, []);
  const [viewMode, setViewMode] = useState('all'); 
  const [filterText, setFilterText] = useState('');
  const [sortOrder, setSortOrder] = useState('ascending'); 

  useEffect(() => {
    httpReq('get', '/item/list')
      .then(item_list => {
        dispatch({ type: 'init', body: item_list });
      });
  }, []);

  const sortItems = (items) => {
    return [...items].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return sortOrder === 'ascending' ? dateA - dateB : dateB - dateA;
    });
  };

  const sortedItems = sortItems(itemList);
  const filteredItems = sortedItems.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <h1>My Grocery App</h1>

      <SearchBar 
        dispatch={dispatch} 
        setViewMode={setViewMode} 
        setFilterText={setFilterText}
        setSortOrder={setSortOrder} 
      />

      <div className="sort-buttons">
        <button onClick={() => setSortOrder('ascending')}>Sort Ascending</button>
        <button onClick={() => setSortOrder('descending')}>Sort Descending</button>
      </div>

      {filteredItems.length > 0 && (
        <GroceryList
          itemList={filteredItems}
          dispatch={dispatch}
          viewMode={viewMode} 
        />
      )}
    </>
  );
}

export default App;
