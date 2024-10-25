/* eslint-disable react/prop-types */
import GroceryItem from './GroceryItem';
import '../css/GroceryList.css';

function GroceryList({ itemList, dispatch, viewMode }) { 

  const groupByDate = (items) => {
    return items.reduce((grouped, item) => {
      const dateKey = new Date(item.date).toLocaleDateString(); 
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(item);
      return grouped;
    }, {});
  };

  const groupedItems = groupByDate(itemList);

  return (
    <>
      {viewMode === 'byDate' ? (
        Object.keys(groupedItems).map(date => (
          <section key={date} className="grocery-section">
            <h2 className="section-heading">{date}</h2>
            <ul>
              {groupedItems[date].map(item_map => (
                <GroceryItem
                  key={item_map.id}
                  itemMap={item_map}
                  dispatch={dispatch}
                />
              ))}
            </ul>
          </section>
        ))
      ) : (
        <section className="grocery-section">
          <ul>
            {itemList.map(item_map => (
              <GroceryItem
                key={item_map.id}
                itemMap={item_map}
                dispatch={dispatch}
              />
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export default GroceryList;
