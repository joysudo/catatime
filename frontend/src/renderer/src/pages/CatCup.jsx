import Store from '../components/Store';
import Inventory from '../components/Inventory';
import Settings from '../components/Settings';

import cupImage from '../assets/images/cup.png';
import cupBackgroundImage from '../assets/images/cup-background.png';
import catImage from '../assets/images/lettuce.png';

import storeIcon from '../assets/images/store.png';
import inventoryIcon from '../assets/images/inventory.png';
import settingsIcon from '../assets/images/settings.png';

import { useState, useCallback, useEffect, useRef } from 'react'

function CatCup() {
  const { electronAPI } = window;

  const [ownedItems, setOwnedItems] = useState(null);
  const [equippedItem, setEquippedItem] = useState(-1);
  const [hours, setHours] = useState(null);
  const [currency, setCurrency] = useState(null);

  const [storeOpen, setStoreOpen] = useState(false);
  const [inventoryOpen, setInventoryOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const [maxHours, setMaxHours] = useState(null);
  const [slackId, setSlackId] = useState(null);
  const [username, setUsername] = useState(null);
  const [themeColor, setThemeColor] = useState(null);
  useEffect(() => {
    electronAPI.readUserData().then(data => {
      setOwnedItems(data.ownedItems ?? []);
      setCurrency(data.currency ?? 0);
      setMaxHours(data.maxHours ?? 2 * 60 * 60);
      setSlackId(data.slackId ?? "user");
      setUsername(data.username ?? "user");
      setThemeColor(data.themeColor ?? "pink");
      setHours(data.hours ?? 0);
    });
  }, []);

  const firstLoad = useRef(true);

  const saveConfig = useCallback((newConfig) => {
    electronAPI.writeUserData(newConfig).catch(err =>
      console.error("Error writing config:", err)
    );
  }, []);

  useEffect(() => {
    if (firstLoad.current) {
      firstLoad.current = false;
      return; // do not save immediately on load
    }

    if (
      currency === null ||
      ownedItems === null ||
      maxHours === null ||
      slackId === null ||
      themeColor === null
    ) return;

    saveConfig({
      currency,
      ownedItems,
      maxHours,
      slackId,
      themeColor,
      hours
    });

  }, [currency, ownedItems, maxHours, slackId, themeColor, hours, saveConfig]);

  if (
    currency === null ||
    ownedItems === null ||
    maxHours === null ||
    slackId === null ||
    themeColor === null ||
    hours === null
  ) {
    return <div className="loading-screen">Loading user data...</div>;
  }
  const addHour=() => { // placeholder
    setHours(prev => Math.min(prev + 1800, maxHours));
  };
  const cashIn=() => {
    setCurrency(prev => prev + Math.floor(hours / 60 / 15)); // 1 coin every 15 min
    setHours(0);
  };
  const buyItem=(item) => { // has to be here bc currency is here
    if (currency >= item.cost) {
      setCurrency(prev => prev - item.cost);
      setOwnedItems(prev => [...prev, item]);
      alert(`success! you've purchased one of item ID ${item.name}!`)
    } else {
      alert("no, you're poor");
    }
  };
  const toggleStore=() => {
    setStoreOpen(prev => !prev);
  };
  const toggleInventory=() => {
    setInventoryOpen(prev => !prev);
  };
  const toggleSettings=() => {
    setSettingsOpen(prev => !prev);
  };

  const fillPercent=hours/maxHours*100;


  return (
    <div className="background" style={{backgroundColor: themeColor}}>
      <div className="cup-page-container">
        <div className="cup">
          <img src={cupBackgroundImage} className="cup-background"/>
          <img src={cupImage} className="cup-foreground" />
          <div
            className="cup-fill"
            style={{
              height: `${fillPercent * 0.9}%`,
              backgroundColor: themeColor,
              filter: 'brightness(80%) saturate(250%)'
            }}
          >
            {ownedItems?.map((item, i) => (
              <img className="cup-cat" src={item.src} style={equippedItem == item.id ? {} : {display: 'none'}} key={i}/>
            ))}
            {equippedItem == -1 && <img className="cup-cat" src={catImage} />}
          </div>
          <div className="cup-background"></div>
        </div>
        <div className="cup-info-container">
          <h1>Welcome back, {username}!</h1> {/*randomizing this message later would be fun*/}
          <p>Your cup is currently at {Math.floor(hours / 60 / 60)} hours and {Math.floor(hours / 60 % 60)} minutes out of the {Math.floor(maxHours / 60 / 60)} hours needed to fill your cup.</p>
          <p>You have {currency} coins to spend on your cat. Ready for a shopping spree?</p>
          <button className="glass-light" onClick={addHour} disabled={hours>=maxHours}>increase hours</button>
          <button className="glass-light" onClick={cashIn} disabled={hours < maxHours}>cash it in</button>
          <div className="cup-button-container">
            <button onClick={toggleStore}><img src={storeIcon} /></button>
            <button onClick={toggleInventory}><img src={inventoryIcon} /></button>
            <button onClick={toggleSettings}><img src={settingsIcon} /></button>
          </div>
          {storeOpen && <Store currency={currency} buyItem={buyItem} toggleStore={toggleStore} ownedItems={ownedItems}/>}
          {inventoryOpen && <Inventory ownedItems={ownedItems} toggleInventory={toggleInventory} equippedItem={equippedItem} setEquippedItem={setEquippedItem}/>}
          {settingsOpen && <Settings toggleSettings={toggleSettings}
            maxHours={maxHours}
            setMaxHours={setMaxHours}
            slackId={slackId}
            setSlackId={setSlackId}
            username={username}
            setUsername={setUsername}
            themeColor={themeColor}
            setThemeColor={setThemeColor}
            hours = {hours}
            setHours = {setHours}
          />}
          </div>
      </div>
    </div>
  )
}

export default CatCup;
