# School Planner appliaction using React and Node.js 
**Project done for EGUI course at Warsaw University of Technology.**

## Description  
The aim of the project was to create school time table using React and Node.js.
  * The user can edit dictionaries - add and remove classes, rooms, teachers and groups.
  * If any of dictionary input will be deleted, related activity will be deleted as well.
  * Changes in dictionaries results in changing the related fileds in activities.
  * User can add new activity by clicking on the table slot.
  * If newly added activity overlaps with already existing one - for instance if user added in the different room but on the same slot and day the same group, older activity will be removed.
  * User can edit table entry by clicking on it. There will be displayed more informations about selected entry and ability to edit it.
  * "unassign" button is available only if selected entry has assigned any data.

## Assumptions  
* data.json file exists on server and contains the desired JSON data structure.
* Data can be empty.
* The data is being stored in data.json file using Express server.

## To build&run  
```sh
npm install; npm run build; node server.js
```

# Demo

![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/school-planner.gif?raw=true)


**Main view**  
Main view contains time table and menu. From this page the user can select dictionary to display and add/edit any timeslot on the timetable.  
  
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/main-view.png?raw=true)  

**Activity view**  
Activity view shows details of the selected timetable entry. It allows for edition - for already assigned entries there is a possibility to 'Unassign'.  
  
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/activity-view.png?raw=true)  

**Dictionary view**  
Dictionary view presents the content of the selected dictionary. It allows to entries edition/removal.  
  
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/dictionary-view.png?raw=true)

**Edition view**  
Edition of dictionary entry view.  
  
![alt text](https://github.com/Kjablonska/React-SchoolPlanner/blob/main/assets/dictionary-edit-view.png?raw=true)
