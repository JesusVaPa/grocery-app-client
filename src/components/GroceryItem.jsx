	/* eslint-disable react/prop-types */
	import { useState } from "react";

	function GroceryItem({ itemMap, dispatch}){

	const [isUpdateMode, setIsUpdateMode] = useState(false);

	function handleDoubleClick(){
		setIsUpdateMode(true);
	}

	function handleBlur(){
		setIsUpdateMode(false);
	}

	function handleKeyDown(event){
		let 
			key_name= event.key,
			input_value, item_id       
		;

		if(key_name === 'Enter'){
			input_value = event.target.value;
			item_id = itemMap.id;
			dispatch({
				type : 'update',
				body : {
						id: item_id,
						name: input_value
				}					
			});
			setIsUpdateMode(false);
		}      
	}

	function handleClickRemove(){
		dispatch({
			type : 'remove',
			body : {id: itemMap.id}
		});
	}

		return (
			<li>				
				<label 
					onDoubleClick={handleDoubleClick}
				>{itemMap.name}</label>
				{
					isUpdateMode 
					&&
					<input
						defaultValue={itemMap.name}
						onKeyDown={handleKeyDown}
						onBlur={ handleBlur }
						autoFocus
					/>
				} 
				<button
					onClick={ handleClickRemove }
				></button>				
			</li>
		);
	}

	export default GroceryItem;