function Store({currency, buyItem, toggleStore, ownedItems}) {
  const inventory = [
    {id: 1, name: "Cherry hat", cost: 5},
    {id: 2, name: "Paper umbrella", cost: 3},
    {id: 3, name: "Sriped straw", cost: 1},
    {id: 4, name: "Basic straw", cost: 2},
    {id: 5, name: "Midnight bird", cost: 6}
  ]


  return (
    <div className="store">
      <h1>Store</h1>
      <div className="store-grid">
        {inventory.map(item => (
          <div key={item.id} className="store-item">
            <p>{item.name}</p>
            <p><i>{item.cost} coins</i></p>
            {!ownedItems.some(ownedItem => ownedItem.id === item.id) && currency >= item.cost &&
              <button className="glass glass-active" onClick={() => buyItem(item)} disabled={currency < item.cost}>buy</button>
            }
            {!ownedItems.some(ownedItem => ownedItem.id === item.id) && currency < item.cost &&
              <button className="glass glass-disabled" disabled={true}>not enough</button>
            }
            {ownedItems.some(ownedItem => ownedItem.id === item.id) &&
              <button className="glass glass-disabled" disabled={1 + 1 == 2}>purchased</button>
            }
          </div>
        ))}
      </div>
      <button className="glass-light" onClick={toggleStore}>close store</button>
    </div>
  )
}

export default Store;
