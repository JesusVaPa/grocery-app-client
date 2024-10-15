import { useState } from 'react';

function Input({ onAddItem }) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    if (newItem.trim()) {
      onAddItem(newItem);  
      setNewItem('');      
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="What would you like to buy?"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default Input;
