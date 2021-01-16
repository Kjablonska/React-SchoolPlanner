import React from 'react';
import { Link  } from "react-router-dom";

var columnsHeaders = [
    "#"
    ,"Monday"
    ,"Tuesday"
    ,"Wednesday"
    ,"Thursday"
    ,"Friday"
  ];

  var rowsHeaders = [
    "8:00-8:45"
    ,"8:55-9:40"
    ,"9:50-11:35"
    ,"11:55-12:40"
    ,"12:50-13:35"
    ,"13:45-14:30"
    ,"14:40-15:25"
    ,"15:35-16:20"
    ,"16:30-17:15"
  ];

function TimeTable(props) {
    const [selectedRoom, setSelectedRoom] = React.useState("");
    const [roomsList, setRooms] = React.useState([]);
    const [activities, setActivities] = React.useState([]);


    React.useEffect( () => {
      setSelectedRoom(roomsList[0])
    }, [roomsList])

    React.useEffect( () => {
      async function fetchRoomsList() {
            let response = await fetch(`/dictionaryList?dictionary=rooms`)
            response = await response.json()
            setRooms(response)
      }

      fetchRoomsList()
    }, [])

    React.useEffect( () => {
      async function fetchActivities() {
            let response =  await fetch(`/activities?room=${selectedRoom}`)
            response = await response.json()
            setActivities(response)
          }
          fetchActivities()
    }, [selectedRoom])

    const changeRoom = (newRoom) => {
      setSelectedRoom(newRoom);
    }

    const goToActivityDetails = (row, col) => {
      let room = selectedRoom;
      return { pathname: "activityDetail", state: {room, row, col}}
    }

    const generateRoomSelection = () => {
      return (
      <select name="select-room" value={selectedRoom} onChange={e => changeRoom(e.target.value)} >
        {(roomsList).map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      )
    }

    const generateColumns = () => {
      let columns = [];
      columnsHeaders.forEach(item => {
        columns.push(
          <th>
            {item}
          </th>
        )
      })

      return columns;
    }

    const generateTableData = () => {
      let rows = [];
      for (const row of rowsHeaders) {
        let columns = [];
        for (const col of columnsHeaders) {
          var data;
          if (col === '#') {
            data = row;
            columns.push (
              <td className="col">{data}</td>
            );
          } else {
            data = "X"
            for(const [key, value] of Object.entries(activities)) {
              if (value["slot"] === row && value["day"] === col) {
                data = value["group"];
              }
            }

            columns.push (
              <td key className="col">
                  <Link to = {goToActivityDetails(row, col)} className="btn btn-primary">
                    <button>{data}</button>
                  </Link>
              </td>
            );
          }
        }
        rows.push (
          <tr key={row} className="row">
              {columns}
          </tr>
        );
      }

      return rows;
    }

    return (
        <>
        <label>Room</label>
          {generateRoomSelection()}
            <table>
              <tbody>
                <tr>{generateColumns()}</tr>
                {generateTableData()}
              </tbody>
            </table>
        </>
    );

}


export default TimeTable;