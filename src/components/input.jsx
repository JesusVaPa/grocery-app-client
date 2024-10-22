import { useState } from 'react';

// eslint-disable-next-line react/prop-types
function Input({ onAddItem }) {
  const [newItem, setNewItem] = useState('');

  const handleAddItem = () => {
    const trimmedItem = newItem.trim();
    if (trimmedItem) {
      onAddItem(trimmedItem);
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
