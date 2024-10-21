	/* eslint-disable react/prop-types */
	import { useState } from "react";
	import httpReq from '../utils/httpReq'


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
			input_value, 
			item_id,
			item_date       
		;

		if(key_name === 'Enter'){
			input_value = event.target.value;
			item_id = itemMap.id;
			item_date = itemMap.date

			httpReq('post', '/item/update/' + item_id, { name: input_value, date: item_date } )
				.then(() => {
					
					dispatch({
						type : 'update',
						body : {
								id: item_id,
								name: input_value,
								date: item_date,
						},					
					});
				})
				.catch(error => {
					console.error(error);
				})
			;
			setIsUpdateMode(false);
		}      
	}

	function handleClickRemove(){
		httpReq('get', '/item/delete/' + itemMap.id)
				.then(() => {
					dispatch({
						type : 'remove',
						body : {id: itemMap.id}
					});		
				})
				.catch(error => {
					console.error(error);
				})
			;
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