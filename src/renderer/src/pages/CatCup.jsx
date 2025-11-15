import Store from '../components/Store';
import Inventory from '../components/Inventory';
import Settings from '../components/Settings';
import { useState } from 'react'

function CatCup() {
  const [ownedItems, setOwnedItems] = useState([]);
  const [hours, setHours] = useState(0);
  const [currency, setCurrency] = useState(0);
  const maxHours = 3; // make this be able to be picked by user eventually
  const fillPercent = hours/maxHours*100;
  // tabs
  const [storeOpen, setStoreOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const addHour = () => { // placeholder
    setHours(prev => Math.min(prev + 0.5, maxHours));
  };
  const cashIn = () => {
    setCurrency(prev => prev + hours);
    setHours(0);
  };
  const buyItem = (item) => { // has to be here bc currency is here
    if (currency >= item.cost) {
      setCurrency(prev => prev - item.cost);
      setOwnedItems(prev => [...prev, item]);
      alert(`success! you've purchased one of item ID ${item.name}!`)
    } else {
      alert("no, you're poor");
    }
  };
  const toggleStore = () => {
    setStoreOpen(prev => !prev);
  };
  const toggleInventory = () => {
    setInventoryOpen(prev => !prev);
  };
  const toggleSettings = () => {
    setSettingsOpen(prev => !prev);
  };

  return (
    <div className="cup-page-container">
      <div className="cup">
        <div className="cup-fill" style={{height: `${fillPercent}%`}}></div>
      </div>
      <div className="cup-info-container">
        <h1>Welcome back, username!</h1> {/*randomizing this message later would be fun*/}
        <p>your cup is currently at {hours} hours out of the {maxHours} needed to fill.</p>
        <p>you have {currency} coins to spend on cat-name. ready for a shopping spree?</p>
        <button onClick = {addHour} disabled={hours>=maxHours}>increase hours (placeholder)</button>
        <button onClick = {cashIn} disabled={hours < maxHours}>pour ur cup</button>
        <div className="cup-button-container">
          <button onClick = {toggleStore}>store</button>
          <button onClick = {toggleInventory}>inventory</button>
          <button onClick = {toggleSettings}>settings</button>
        </div>
        {storeOpen && <Store currency={currency} buyItem={buyItem} toggleStore={toggleStore} ownedItems={ownedItems}/>}
        {inventoryOpen && <Inventory ownedItems={ownedItems} toggleInventory={toggleInventory}/>}
        {settingsOpen && <Settings toggleSettings={toggleSettings}/>}
        </div>
    </div>
  )
}

export default CatCup;
