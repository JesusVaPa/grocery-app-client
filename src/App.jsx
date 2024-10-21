import { useEffect, useReducer } from 'react';
import reducer from './reducer';
import httpReq from './utils/httpReq';
import './App.css';
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';

function App() {
  const [itemList, dispatch] = useReducer(reducer, []);

  useEffect(function () {
    httpReq('get', '/item/list')
      .then(item_list => {
        dispatch({ type: 'init', body: item_list });
      });
  }, []);

  const handleSortChange = (sortType) => {
    let sortedList;
    switch (sortType) {
      case 'alphabetical':
        sortedList = [...itemList].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'date-asc':
        sortedList = [...itemList].sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case 'date-desc':
        sortedList = [...itemList].sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      default:
        sortedList = itemList;
    }
    dispatch({ type: 'init', body: sortedList });
  };

  return (
    <>
      <h1> My Grocery App </h1>
      <SearchBar dispatch={dispatch} />
      {
        itemList.length > 0 &&
        <GroceryList
          itemList={itemList}
          dispatch={dispatch}
          onSortChange={handleSortChange} 
        />
      }
    </>
  );
}

export default App;
