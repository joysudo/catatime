import { useState } from 'react'

function Settings({toggleSettings, maxHours, setMaxHours, slackId, setSlackId, themeColor, setThemeColor, username, setUsername}) {
  const [tempMaxHours, setTempMaxHours] = useState(maxHours);
  const [tempSlackId, setTempSlackId] = useState(slackId);
  const [tempUsername, setTempUsername] = useState(username);
  const themeColors = ['LightPink', '#fcd95b', 'DarkSeaGreen', 'SkyBlue', 'DarkGray', '#eea9f5']

  const handleSave = () => {
    setMaxHours(Number(tempMaxHours));
    setSlackId(tempSlackId);
    setUsername(tempUsername);
  }
  const handleColorChange = (color) => {
    setThemeColor(color);
  }

  const fetchStats = async () => {
    if (!slackId) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`http://localhost:3000/stats?slack_id=${slackId}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Failed to fetch stats");
      }
      const data = await res.json();
      const username = data.username;
    } catch (err) {
      setError(err.message);
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
        /> /*note to self from kat btw look at this*/
      </label>
      <label>Username:
        <input
          id="usernameInput"
          type="text"
          value={tempUsername}
          onChange={(e) => setTempUsername(e.target.value)}
        /> /*note to self from kat btw look at this*/
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
}}

export default Settings;
