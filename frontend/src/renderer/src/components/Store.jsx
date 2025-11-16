import coinImage from '../assets/images/coin.png'
import cherryHatImage from '../assets/images/store/cherry-hat.png'
import miniUmbrellaImage from '../assets/images/store/mini-umbrella.png'
import chocoStrawImage from '../assets/images/store/choco-straw.png'
import saikiKImage from '../assets/images/store/saiki-k.png'
import midnightBirdImage from '../assets/images/store/midnight-bird.png'

function Store({ currency, buyItem, toggleStore, ownedItems }) {
  const inventory = [
    { id: 1, name: 'Cherry hat', cost: 5, src: cherryHatImage },
    { id: 2, name: 'Mini umbrella', cost: 3, src: miniUmbrellaImage },
    { id: 3, name: 'Choco straw', cost: 1, src: chocoStrawImage },
    { id: 4, name: 'Saiki K', cost: 2, src: saikiKImage },
    { id: 5, name: 'Midnight bird', cost: 6, src: midnightBirdImage }
  ]

  return (
    <div className="store">
      <h1>Store</h1>
      <div className="store-grid">
        {inventory.map((item) => (
          <div key={item.id} className="store-item">
            <p>{item.name}</p>
            <p>
              <i>
                {item.cost}&nbsp;
                <img src={coinImage} style={{ height: '16px', transform: 'translateY(20%)' }} />s
              </i>
            </p>
            {!ownedItems.some((ownedItem) => ownedItem.id === item.id) && currency >= item.cost && (
              <button
                className="glass glass-active"
                onClick={() => buyItem(item)}
                disabled={currency < item.cost}
              >
                buy
              </button>
            )}
            {!ownedItems.some((ownedItem) => ownedItem.id === item.id) && currency < item.cost && (
              <button className="glass glass-disabled" disabled={true}>
                not enough
              </button>
            )}
            {ownedItems.some((ownedItem) => ownedItem.id === item.id) && (
              <button className="glass glass-disabled" disabled={1 + 1 == 2}>
                purchased
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="glass-light" onClick={toggleStore}>
        close store
      </button>
    </div>
  )
}

export default Store
