const express = require('express');
const app = express(); // create express app
const path = require('path');


app.use(express.static(path.join(__dirname, 'build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});


// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
app.use(express.json());


app.get('/dictionaryList', async (req, res) => {
    res.json(await getDictionaryData(req.query.dictionary))
})

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

app.post('/addDictionaryEntry', (req, res) => {
    console.log(req.body.dictionary)
    console.log(req.body.newEntry)
    res.json(addDictionaryEntry(req.body.dictionary, req.body.newEntry));
})

app.post('/saveActivity', async(req, res) => {
    res.json(saveAcivity(req.body.room, req.body.slot, req.body.day, req.body.group, req.body.class, req.body.teacher));
})

app.post('/unassignEntry', async(req, res) => {
    res.json(unassignEntry(req.body.room, req.body.slot, req.body.day));
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
    .then(x => JSON.parse(x)["activities"].filter(item => item.room.indexOf(roomName) > -1) || [])
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

async function saveAcivity(room, slot, day, group, clas, teacher) {
    console.log(room, slot, day);
    var data = await getJsonData();

    for (const item of data["activities"]) {
        if (item.room === room && item.day === day && item.slot === slot) {
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
        "slot": slot,
        "teacher": teacher
    };
    data["activities"].push(item);

    checkDataCorrectness(data, room, slot, day, group, teacher);

    serializeData(data);
}


function checkDataCorrectness(data, room, slot, day, group, teacher) {
    for (const item of data["activities"]) {
        if (item.room !== room && item.day === day && item.slot === slot) {
            if (item.group === group || item.teacher === teacher) {
                var index = data["activities"].indexOf(item);
                data["activities"].splice(index, 1);
            }
        }
    }
}

async function unassignEntry(room, slot, day) {
    console.log(room, slot, day);
    var data = await getJsonData();

    for (const item of data["activities"]) {
        if (item.room === room && item.day === day && item.slot === slot) {
            // console.log(data["activities"].indexOf(item))
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

    var index = data[dictionary].indexOf(entry);
    if (index !== -1)
        data[dictionary].splice(index, 1);

    serializeData(data);

    return dictionary;
}

// Editing entry of the given dictionary.
async function editDictionaryEntry(dictionary, entry, newEntry) {
    var data = await getJsonData();

    var index = data[dictionary].indexOf(entry);
    if (index !== -1) {
        console.log("data", data[dictionary][index])
        data[dictionary][index] = newEntry;
    }

    serializeData(data);

    return dictionary;
}

async function addDictionaryEntry(dictionary, newEntry) {
    var data = await getJsonData();

    var index = data[dictionary].indexOf(newEntry);
    if (index === -1) { // checking if such entry already exists
        data[dictionary].push(newEntry);
        serializeData(data);
    }
}


async function getJsonData() {
    const fs = require('fs').promises;
    return await fs.readFile('./data.json', 'utf8')
    .then(x => JSON.parse(x) || [])
    .catch(e => e)
}

function serializeData(data) {
    const fs = require('fs').promises;
    const jsonContent = JSON.stringify(data);
    fs.writeFile("./data.json", jsonContent, 'utf8', function (err) {
        if (err)
            return console.log(err);
    });
}


// start express server on port 5000
app.listen(5000, () => {
  console.log("server started on port 5000");
});