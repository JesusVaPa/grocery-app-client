import { useReducer } from 'react'
import reducer from './reducer';
import './App.css'
import SearchBar from './components/SearchBar';
import GroceryList from './components/GroceryList';
 
 
function App() {
  const [itemList, dispatch] = useReducer( reducer, []);
 
  return (
    <>
      <h1> My Grocery App  </h1>
      <SearchBar 
        dispatch={dispatch}
      />
      {
        itemList.length > 0 &&
        <GroceryList
          itemList = {itemList}
          dispatch = {dispatch}
          />
      }
    </>
  );
}
 
export default App;