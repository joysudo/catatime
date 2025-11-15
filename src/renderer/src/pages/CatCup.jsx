import Store from '../components/Store';
import { useState } from 'react'

function CatCup() {
  const [hours, setHours] = useState(0);
  const [currency, setCurrency] = useState(0);
  const maxHours = 3; // make this be able to be picked by user eventually
  const fillPercent = hours/maxHours*100;
  const [storeOpen, setStoreOpen] = useState(false);

  // placeholder
  const addHour = () => {
    setHours(prev => Math.min(prev + 0.5, maxHours));
  };
  const cashIn = () => {
    setCurrency(prev => prev + hours);
    setHours(0);
  };
  const toggleStore = () => {
    setStoreOpen(prev => !prev);
  }

  return (
    <>
      <h2>Hours: {hours} / {maxHours}</h2>
      <div className="cup">
        <div className="cup-fill" style={{height: `${fillPercent}%`}}></div>
      </div>
      <h2>Currency: {currency}</h2>
      <button onClick = {addHour} disabled={hours>=maxHours}>placeholder, increase hours</button>
      <button onClick = {cashIn} disabled={hours < maxHours}>cash in</button>
      <button onClick = {toggleStore}>toggle store</button>
      {storeOpen && <Store/>}
    </>
  )
}

export default CatCup;
