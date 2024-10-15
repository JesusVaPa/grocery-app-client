function reducer(itemList, action){
	switch(action.type){
		case 'add':{
			let item_map = action.body;
			return [...itemList, item_map];
		}
		case 'update': {
			let
				update_item_map = action.body,
				update_item_id = action.body.id
			;
			return itemList.map(function(item_map){
				if(item_map.id === update_item_id){
					return update_item_map;
				}
				return item_map;
			});	
		}
		case 'remove': {
			let item_id = action.body.id;
			return itemList.filter(function(item_map){
				return item_map.id !== item_id;
			});
		}
		default : {
			throw new Error('Unknown action ' + action.type);
		}
	}
}

export default reducer;