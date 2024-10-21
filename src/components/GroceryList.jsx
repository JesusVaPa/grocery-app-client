/* eslint-disable react/prop-types */
import GroceryItem from './GroceryItem';
import '../css/GroceryList.css';

function GroceryList({ itemList, dispatch }) {
  return (
    <>
      <ul>
        {
          itemList.map(function(item_map) {
            return (
              <GroceryItem
                key={item_map.id}
                itemMap={item_map}
                dispatch={dispatch}
              />
            );
          })
        }
      </ul>
    </>
  );
}

export default GroceryList;
