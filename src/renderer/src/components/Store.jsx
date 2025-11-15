function Store({currency, buyItem, toggleStore, ownedItems}) {
  const inventory = [
    {id: 1, name: "hat 1", cost: 5},
    {id: 2, name: "hat 2", cost: 3},
    {id: 3, name: "hat 3", cost: 1},
    {id: 4, name: "hat 4", cost: 2},
    {id: 5, name: "hat 5", cost: 6}
  ]


  return (
    <div className="store">
      <h2>store</h2>
      <div className="store-grid">
        {inventory.map(item => (
          <div key={item.id} className="store-item">
            {item.name}, for {item.cost} coins
            {!ownedItems.some(ownedItem => ownedItem.id === item.id) && currency >= item.cost &&
              <button onClick={() => buyItem(item)} disabled={currency < item.cost}>buy</button>
            }
            {!ownedItems.some(ownedItem => ownedItem.id === item.id) && currency < item.cost &&
              <button disabled={true}>not enough currency</button>
            }
            {ownedItems.some(ownedItem => ownedItem.id === item.id) &&
              <button disabled={1 + 1 == 2}>purchased</button>
            }
          </div>
        ))}
      </div>
      <button onClick={toggleStore}>close store</button>
    </div>
  )
}

export default Store;
