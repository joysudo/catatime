import { useState } from 'react'

function Settings({toggleSettings, maxHours, setMaxHours, slackId, setSlackId, themeColor, setThemeColor, username, setUsername, setHours}) {
  const [tempMaxHours, setTempMaxHours] = useState(maxHours/60/60);
  const [tempSlackId, setTempSlackId] = useState(slackId);
  const [tempUsername, setTempUsername] = useState(username);
  const themeColors = ['LightPink', '#fcd95b', 'DarkSeaGreen', 'SkyBlue', 'DarkGray', '#eea9f5']
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSave = (e) => {
    console.log("saving");
    getStats(tempSlackId).then(results => {
      alert("pizza " + results.data.username)
      alert("pepperoni " + results.data.total_seconds)
      setUsername(results.data.username)
      setHours(results.data.total_seconds)
    }) //ts .then gets the stats and then after it gets stats the alert existsf
    setMaxHours(Number(tempMaxHours)*60*60); {/* "max hours" is a misnomer; the units for this in the system is in seconds, but the user input is their number of hours*/}
    setSlackId(tempSlackId);
  }
  const handleColorChange = (color) => {
    setThemeColor(color);
  }

    async function getStats(functionSlackId) {
      const res = await fetch(`http://localhost:3000/stats?slack_id=${functionSlackId}`);
      const data = await res.json();
      return data;
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
          onChange={(e) => {
            setTempSlackId(e.target.value);
          }}
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
      <button className="glass-light" onClick={(e) => handleSave(e)}>save</button>
      <button className="glass-light" onClick={toggleSettings}>close settings</button>
    </div>
  )
}

export default Settings;
