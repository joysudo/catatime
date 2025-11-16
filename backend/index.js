
const cors = require('cors')
const express = require("express");
const app = express()
const dayjs = require('dayjs')
dayjs().format()

app.use(cors());
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.sendStatus(200);
})
// app.options('*', cors());

app.get("/stats",cors(), async (req, res) => {
    try { const slack_id = req.query.slack_id;
        const startofday = dayjs().startOf('day');
        const endofday = dayjs().endOf('day');
        const response = await fetch(`https://hackatime.hackclub.com/api/v1/users/${slack_id}/stats?start_date=${startofday}&end_date=${endofday}`);

            console.log(slack_id);
            const text = await response.text(); // read raw text
            console.log("API returned:", text)
            console.log(startofday + " " + endofday);

        if (!response.ok) {
            return res.status(response.status).send(text);
        } 

        let data;
        
        try {
            data = JSON.parse(text);
        } catch (err) {
            return res.status(500).send("API did not return valid JSON");
        }

        res.json(data); 

    }
        
    catch (error) {
        console.error(error);
        console.log(error); // log full error
        res.status(500).json({ error: "Failed to fetch stats" });
    }
});

app.listen(3000, () => console.log("server running at localhost:3000"));