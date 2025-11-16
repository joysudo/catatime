import { useState } from 'react'

function Inventory({ownedItems, toggleInventory, equippedItem, setEquippedItem}) {
  const equipItem = (itemId) => {
    setEquippedItem(itemId);
  };

  return (
    <div className="store">
      <h1>Inventory</h1>
      <div className="store-grid">
        {ownedItems.map(item => (
          <div key={item.id} className="store-item">
            {item.name}
            {equippedItem != item.id &&
              <button className="glass" onClick={() => equipItem(item.id)}>equip</button>
            }
            {equippedItem == item.id &&
              <button className="glass" onClick={() => equipItem(-1)}>unequip</button>
            }
          </div>
        ))}
      </div>
      {equippedItem==-1 ?
        <p><i>No item is currently equipped.</i></p> :
        <p><i>Item #{equippedItem} is currently equipped.</i></p>

      }
      <button className="glass-light" onClick={toggleInventory}>close inventory</button>
    </div>
  )
}

export default Inventory;
