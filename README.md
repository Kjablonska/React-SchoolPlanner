# School Planner appliaction using React and Node.js 
**Project done for EGUI course at Warsaw University of Technology.**

**Description:**</br>
The aim of the project was to create school time table. 
Main view contains a table with time slots and information about the class written in the table entry. 
Clicking on the entry triggers redirection to another page showing details of the selected entry - teacher, group, class, day and slot and allowing for data entry edition. 
There is a possbility to add, edit and remove all dictionaries - teachers, classes, groups and activities.
Changes in dictionaries results in changing the related fileds in activities.

**Assumptions:**
* data.json file exists on server and contains the desired JSON data structure.
* Data can be empty.
* The data is being stored in data.json file using Express server.

**To build&run:**
npm install; npm run build; node server.js

# Demo

![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/school-planner.gif?raw=true)


**Main view**
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/main-view.png?raw=true)

**Activity view**
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/activity-view.png?raw=true)

**Dictionary view**
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/dictionary-view.png?raw=true)
