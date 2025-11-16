import { useState } from 'react'

function Settings({toggleSettings, maxHours, setMaxHours, slackId, setSlackId, themeColor, setThemeColor}) {
  const [tempMaxHours, setTempMaxHours] = useState(maxHours);
  const [tempSlackId, setTempSlackId] = useState(slackId);
  const themeColors = ['LightPink', '#fcd95b', 'DarkSeaGreen', 'SkyBlue', 'DarkGray', '#eea9f5']

  const handleSave = () => {
    setMaxHours(Number(tempMaxHours));
    setSlackId(tempSlackId);
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
      <label>SlackId:
        <input
          id="slackIdInput"
          type="text"
          value={tempSlackId}
          onChange={(e) => setTempSlackId(e.target.value)}
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
      <button className="glass-light" onClick={handleSave}>save</button>
      <button className="glass-light" onClick={toggleSettings}>close settings</button>
    </div>
  )
}

export default Settings;
