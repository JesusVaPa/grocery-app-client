import '../CSS/SearchBar.css';
import httpReq from '../utils/httpReq'

// eslint-disable-next-line react/prop-types
function SearchBar({dispatch}) {
	
	function handleKeyDown(event){
		let 
			key_name=event.key,
			input_value
		;
	
		if(key_name==='Enter'){
			input_value=event.target.value;

			httpReq('post', '/item/create', {name: input_value})
				.then(item_map => {
								
					dispatch({
						type: 'add',
						body: item_map
					});
				})
				.catch(error => {
					console.error(error);
				})
			;
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
