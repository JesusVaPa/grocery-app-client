/* eslint-disable react/prop-types */
import GroceryItem from './GroceryItem';
import SortWidget from './SortWidget'; // Asegúrate de importar el nuevo componente
import '../CSS/GroceryList.css';

// eslint-disable-next-line react/prop-types
function GroceryList({ itemList, dispatch, onSortChange }) {
  return (
    <>
      {itemList.length > 0 && (
        <SortWidget onSortChange={onSortChange} />
      )}
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
