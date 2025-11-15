import { useState } from 'react'

function Settings({toggleSettings, maxHours, setMaxHours, username, setUsername}) {
  const [tempMaxHours, setTempMaxHours] = useState(maxHours);
  const [tempUsername, setTempUsername] = useState(username);

  const handleSave = () => {
    setMaxHours(Number(tempMaxHours));
    setUsername(tempUsername);
  }

  return (
    <div className="store">
      <h1>settings</h1>
      <label>Hours per cup:
        <input
          id="maxHoursInput"
          type="number"
          value={tempMaxHours}
          onChange={(e) => setTempMaxHours(e.target.value)}
          min="1"
        />
      </label>
      <label>Username:
        <input
          id="usernameInput"
          type="text"
          value={tempUsername}
          onChange={(e) => setTempUsername(e.target.value)}
        />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={toggleSettings}>close settings</button>
    </div>
  )
}

export default Settings;
