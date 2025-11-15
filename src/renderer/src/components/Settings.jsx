import { useState } from 'react'

function Settings({toggleSettings, maxHours, setMaxHours, username, setUsername, themeColor, setThemeColor}) {
  const [tempMaxHours, setTempMaxHours] = useState(maxHours);
  const [tempUsername, setTempUsername] = useState(username);
  const themeColors = ['LightPink', '#fcd95b', 'DarkSeaGreen', 'SkyBlue', 'DarkGray', '#eea9f5']

  const handleSave = () => {
    setMaxHours(Number(tempMaxHours));
    setUsername(tempUsername);
  }
  const handleColorChange = (color) => {
    setThemeColor(color);
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
      <p>Theme color: </p>
      <div className="color-circle-container">
        {themeColors.map((color) => (
          <div
            key={color}
            className={`color-circle`}
            style={{
              backgroundColor: color,
              border: themeColor == color ? '3px solid white' : 'none'
            }}
            onClick={() => handleColorChange(color)}
          ></div>
        ))}
      </div>
      <button onClick={handleSave}>Save</button>
      <button onClick={toggleSettings}>close settings</button>
    </div>
  )
}

export default Settings;
