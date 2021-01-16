const { time, log } = require('console');
const express = require('express');
const app = express(); // create express app


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.get('/dictionaryList', async (req, res) => {
    res.json(await getDictionaryData(req.query.dictionary))
})

// app.post('/dictionaryList', async (req, res) => {
//     res.statusCode = 200;
//     res.json(await getDictionaryData(req.query.dictionary))
// })

app.get('/activities', async(req, res) => {
    res.json(await getRoomActivities(req.query.room));
})

app.get('/activityDetail', async(req, res) => {
    res.json(await getActivityDetail(req.query.room, req.query.slot, req.query.day));
})

app.post('/removeDictionaryEntry', (req, res) => {
    res.json(removeDictionaryEntry(req.body.dictionary, req.body.entry));
})

app.post('/editDictionaryEntry', (req, res) => {
    console.log(req.body.dictionary)
    console.log(req.body.entry)
    console.log(req.body.newEntry)
    res.json(editDictionaryEntry(req.body.dictionary, req.body.entry, req.body.newEntry));
})

app.post('editActivity', async(req, res) => {
    editAcivity(req.query.room, req.query.slot, req.query.day, req.query.group, req.query.class, req.query.teacher);
})

async function getDictionaryData(dictionary) {
    const fs = require('fs').promises;
    return await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x)[dictionary] || [])
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

async function editAcivity(roomName, slot, day, group, clas, teacher) {
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


// Removing entry of the given dictionary.
async function removeDictionaryEntry(dictionary, entry) {
    console.log("entry", entry)
    console.log("dict", dictionary)
    const fs = require('fs').promises;
    var data = await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x) || "missing key")
    .catch(e => e)

    var index = data[dictionary].indexOf(entry);
    if (index !== -1)
        data[dictionary].splice(index, 1);

    const jsonContent = JSON.stringify(data);
    fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });

    return dictionary;
}

// Editing entry of the given dictionary.
async function editDictionaryEntry(dictionary, entry, newEntry) {
    console.log("entry", entry)
    console.log("newEntry", newEntry)
    console.log("dict", dictionary)
    const fs = require('fs').promises;
    var data = await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x) || [])
    .catch(e => e)

    var index = data[dictionary].indexOf(entry);
    if (index !== -1) {
        console.log("data", data[dictionary][index])
        data[dictionary][index] = newEntry;
    }

    const jsonContent = JSON.stringify(data);
    fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });

    return dictionary;
}



// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});