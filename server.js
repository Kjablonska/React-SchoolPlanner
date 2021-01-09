const express = require('express');
const app = express(); // create express app

app.get('/dictionaryList', async (req, res) => {
    res.json(await getDictionaryData(req.query.dictionary))
})

app.get('/activities', async(req, res) => {
    res.json(await getRoomActivities(req.query.room));
})

async function getDictionaryData(dictionary) {
    const fs = require('fs').promises;
    return await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x)[dictionary] || "missing key")
    .catch(e => e)
}

async function getRoomActivities(roomName) {
    const fs = require('fs').promises;
    return await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x)["activities"].filter(item => item.room.indexOf(roomName) > -1) || "missing key")
    .catch(e => e)
}

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});