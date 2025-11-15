import { useState } from 'react'

function Inventory({ownedItems, toggleInventory}) {
  const [equippedItem, setEquippedItem] = useState(-1);
  const equipItem = (itemId) => {
    setEquippedItem(itemId);
  };

  return (
    <div className="store">
      <h2>inventory</h2>
      <div className="store-grid">
        {ownedItems.map(item => (
          <div key={item.id} className="store-item">
            {item.name}
            {equippedItem != item.id &&
              <button onClick={() => equipItem(item.id)}>equip</button>
            }
            {equippedItem == item.id &&
              <button onClick={() => equipItem(-1)}>unequip</button>
            }
          </div>
        ))}
      </div>
      <p>{`currently eqiupped item is ${equippedItem}`}</p>
      <button onClick={toggleInventory}>close inventory</button>
    </div>
  )
}

export default Inventory;
