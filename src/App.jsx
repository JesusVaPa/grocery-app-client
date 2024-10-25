import { useEffect, useReducer, useState } from 'react';
import reducer from './reducer';
import httpReq from './utils/httpReq';
import './App.css';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';

function App() {
  const [itemList, dispatch] = useReducer(reducer, []);
  const [viewMode, setViewMode] = useState('byDate'); 
  const [filterText, setFilterText] = useState(''); 

  useEffect(() => {
    httpReq('get', '/item/list')
      .then(item_list => {
        dispatch({ type: 'init', body: item_list });
      });
  }, []);

  const filteredItems = itemList.filter(item =>
    item.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
      <h1>My Grocery App</h1>
      <SearchBar 
        dispatch={dispatch} 
        setViewMode={setViewMode} 
        setFilterText={setFilterText} 
      />
      
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
