const { time } = require('console');
const express = require('express');
const app = express(); // create express app

app.get('/dictionaryList', async (req, res) => {
    res.json(await getDictionaryData(req.query.dictionary))
})

app.get('/activities', async(req, res) => {
    res.json(await getRoomActivities(req.query.room));
})

app.get('/activityDetail', async(req, res) => {
    res.json(await getActivityDetail(req.query.room, req.query.slot, req.query.day));
})

app.post('editActivity', async(req, res) => {
    editAcivity(req.query.room, req.query.slot, req.query.day, req.query.group, req.query.class, req.query.teacher);
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

async function getActivities() {
    const fs = require('fs').promises;
    return await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x)["activities"])
    .catch(e => e)
}

async function getActivityDetail(roomName, slot, day) {
    const act = await getActivities();
    for(const item of act) {
        if (item.room === roomName && item.day === day && item.slot === slot) {
            return item;
        }
    }
}

function editAcivity(roomName, slot, day, group, clas, teacher) {
    const act = await getActivities();
    for (const item of act) {
        if (item.room === roomName && item.day === day && item.slot === slot) {
            item.group = group;
            item.class = clas;
            item.teacher = teacher;
            return;
        }
    }
}

// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});