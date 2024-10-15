import { useState } from "react";
import '../CSS/SearchBar.css';

// eslint-disable-next-line react/prop-types
function SearchBar({dispatch}) {
	const [itemId, setItemId ] = useState ( 0 );
	
	function handleKeyDown(event){
		let 
			key_name=event.key,
			input_value
		;
	
		if(key_name==='Enter'){
			input_value=event.target.value;
			dispatch({
				type: 'add',
				body: {
					id:'c'+itemId,
					name: input_value
				}
			});
		setItemId (itemId + 1);
		event.target.value = '';
		}
	}
 return (
    <input
    className="search-bar"
    type="text"
    placeholder="What would you like to buy today?"
    onKeyDown={handleKeyDown}
      />
 );
}
export default SearchBar;
