const express = require('express');
const app = express(); // create express app

app.get('/dictionaryList', async (req, res) => {
    res.json(await getDictionaryData(req.query.dictionary))
})

function getDictionaryData(dictionary) {
    const fs = require('fs').promises;
    return fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x)[dictionary] || "missing key")
    .catch(e => e)
}

app.get('/', (req, res) => {
    res.send('Hello World!')
})

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});