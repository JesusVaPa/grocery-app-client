import GroceryItem from './GroceryItem';
import '../CSS/GroceryList.css';

// eslint-disable-next-line react/prop-types
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

  const groupedItems = viewMode === 'byDate' ? groupByDate(itemList) : { 'All Items': itemList };

  return (
    <>
      {
        Object.keys(groupedItems).map(date => (
          <section key={date} className="grocery-section"> 
            <h2 className="section-heading">{date}</h2> 
            <ul>
              {groupedItems[date].map(item_map => (
                <GroceryItem
                  key={item_map.id}
                  itemMap={item_map}
                  dispatch={dispatch}
                  viewMode={viewMode} 
                />
              ))}
            </ul>
          </section>
        ))
      }
    </>
  );
}

export default GroceryList;
