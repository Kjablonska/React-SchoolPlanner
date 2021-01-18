const express = require('express');
const app = express();
const path = require('path');

const data_file = './data.json'

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/dictionaryList', async (req, res) => {
    if (Object.keys(req.query).length === 0 || req.query.dictionary === '' || req.query.dictionary === undefined)
        res.json([]);
    else
        res.json(await getDictionaryData(req.query.dictionary))
})

app.get('/activities', async (req, res) => {
    if (Object.keys(req.query).length === 0 || req.query.room === '' || req.query.room === undefined)
        res.json([])
    else
        res.json(await getRoomActivities(req.query.room));
})

app.get('/activityDetail', async (req, res) => {
    if (Object.keys(req.query).length === 0 || req.query.room === '' || req.query.room === undefined || req.query.slot === '' || req.query.slot === undefined || req.query.day === '' || req.query.day === undefined)
        res.json([])
    else
        res.json(await getActivityDetail(req.query.room, req.query.slot, req.query.day));
})

app.post('/removeDictionaryEntry', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.dictionary === '' || req.body.dictionary === undefined || req.body.entry === '' || req.body.entry === undefined)
        res.json("Missing paramters")
    else
        res.json(removeDictionaryEntry(req.body.dictionary, req.body.entry));
})

app.post('/editDictionaryEntry', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.dictionary === '' || req.body.dictionary === undefined || req.body.entry === '' || req.body.entry === undefined || req.body.newEntry === '' || req.body.newEntry === undefined)
        res.json("Missing paramters")
    else
        res.json(editDictionaryEntry(req.body.dictionary, req.body.entry, req.body.newEntry));
})

app.post('/addDictionaryEntry', (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.dictionary === undefined || req.body.newEntry === undefined || req.body.dictionary === '' && req.body.newEntry === '')
        res.json("Missing paramters")
    else
        res.json(addDictionaryEntry(req.body.dictionary, req.body.newEntry));
})

app.post('/saveActivity', async (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.room === undefined || req.body.slot === undefined || req.body.day === undefined || req.body.group === undefined || req.body.class === undefined || req.body.teacher === undefined || req.body.room === '' || req.body.slot === undefined || req.body.day === '' || req.body.group === '' || req.body.class === '' || req.body.teacher === '')
        res.json("Missing paramters")
    else
        res.json(saveAcivity(req.body.room, req.body.slot, req.body.day, req.body.group, req.body.class, req.body.teacher));
})

app.post('/unassignEntry', async (req, res) => {
    if (Object.keys(req.body).length === 0 || req.body.room === undefined || req.body.slot === undefined || req.body.day === undefined || req.body.room === '' || req.body.slot === undefined || req.body.day === '')
        res.json("Missing paramters")
    else
        res.json(unassignEntry(req.body.room, req.body.slot, req.body.day));
})


async function getDictionaryData(dictionary) {
    const fs = require('fs').promises;
    return await fs.readFile(data_file, 'utf8')
        .then(x => JSON.parse(x)[dictionary] || [])
        .catch(e => console.log(e))
}

async function getRoomActivities(roomName) {
    const fs = require('fs').promises;
    return await fs.readFile(data_file, 'utf8')
        .then(x => JSON.parse(x)["activities"].filter(item => item.room.indexOf(roomName) > -1) || [])
        .catch(e => console.log(e))
}

async function getActivities() {
    const fs = require('fs').promises;
    return await fs.readFile(data_file, 'utf8')
        .then(x => JSON.parse(x)["activities"])
        .catch(e => console.log(e))
}

async function getActivityDetail(room, slot, day) {
    const act = await getActivities();
    for (const item of act) {
        if (item.room === room && item.day === day && item.slot == slot) {
            return item;
        }
    }

}

async function saveAcivity(room, slot, day, group, clas, teacher) {
    var data = await getJsonData();
    for (const item of data["activities"]) {
        if (item.room === room && item.day === day && item.slot == slot) {
            var index = data["activities"].indexOf(item);
            data["activities"][index].group = group;
            data["activities"][index].class = clas;
            data["activities"][index].teacher = teacher;
            serializeData(data);
            return;
        }
    }

    var item = {
        "class": clas,
        "day": day,
        "group": group,
        "room": room,
        "slot": parseInt(slot),
        "teacher": teacher
    };
    data["activities"].push(item);

    checkDataCorrectness(data, room, slot, day, group, teacher);

    serializeData(data);
}


function checkDataCorrectness(data, room, slot, day, group, teacher) {
    for (const item of data["activities"]) {
        if (item.room !== room && item.day === day && item.slot == slot) {
            if (item.group === group || item.teacher === teacher) {
                var index = data["activities"].indexOf(item);
                data["activities"].splice(index, 1);
            }
        }
    }
}

async function unassignEntry(room, slot, day) {
    var data = await getJsonData();

    for (const item of data["activities"]) {
        if (item.room === room && item.day === day && item.slot == slot) {
            var index = data["activities"].indexOf(item);
            data["activities"].splice(index, 1);
            break;
        }
    }

    serializeData(data)
}

// Removing entry of the given dictionary.
async function removeDictionaryEntry(dictionary, entry) {
    var data = await getJsonData();
    console.log("Edit dictionary entry", dictionary, entry);

    var index = data[dictionary].indexOf(entry);
    if (index !== -1)
        data[dictionary].splice(index, 1);

    // Removal of dictionary entry results in removal of connected activities.
    var value = dictionary.slice(0, -1);    // Removing last character of dictionary name to make it singular.
    if (dictionary === "classes")            // Special case for "classes" dictionary, there is a need to remove last two characters to make it singular.
        value = value.slice(0, -1);

    for (const item of data["activities"]) {
        if (item[value] === entry) {
            data["activities"].splice(data["activities"].indexOf(item), 1);
        }
    }

    serializeData(data);
}

async function editDictionaryEntry(dictionary, entry, newEntry) {
    console.log("Edit dictionary entry", dictionary, entry, newEntry);
    var data = await getJsonData();

    var index = data[dictionary].indexOf(entry);
    if (index !== -1)
        data[dictionary][index] = newEntry;

    // Removal of dictionary entry results in removal of connected activities.
    var value = dictionary.slice(0, -1); // Removing last character of dictionary name.
    if (dictionary === "classes")
        value = dictionary.slice(0, -1); // Removing last character of dictionary name.

    for (const item of data["activities"]) {
        if (item[value] === entry)
            item[value] = newEntry
    }

    serializeData(data);
}

async function addDictionaryEntry(dictionary, newEntry) {
    var data = await getJsonData();

    var index = data[dictionary].indexOf(newEntry);
    if (index === -1) {         // Checking if such entry already exists
        data[dictionary].push(newEntry);
        serializeData(data);
    }
}

async function getJsonData() {
    const fs = require('fs').promises;
    return await fs.readFile(data_file, 'utf8')
        .then(x => JSON.parse(x) || [])
        .catch(e => console.log(e))
}

function serializeData(data) {
    const fs = require('fs').promises;
    const jsonContent = JSON.stringify(data);
    fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
}

app.listen(5000, () => {
    console.log("server started on port 5000");
});