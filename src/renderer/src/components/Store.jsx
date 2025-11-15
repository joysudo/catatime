import { useState } from 'react'

function Store({currency, buyItem}) {
  const inventory = [
    {id: 1, name: "hat 1", cost: 5},
    {id: 2, name: "hat 2", cost: 3},
    {id: 3, name: "hat 3", cost: 1},
    {id: 4, name: "hat 4", cost: 2},
    {id: 5, name: "hat 5", cost: 6}
  ]


  return (
    <div className="store">
      {inventory.map(item => (
        <div key={item.id} className="store-item">
          {item.name} - {item.cost} coins
          <button onClick={() => buyItem(item.id, item.cost)} disabled={currency < item.cost}>buy</button>
        </div>
      ))}
    </div>
  )
}

export default Store;
