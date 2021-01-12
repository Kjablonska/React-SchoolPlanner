import React from 'react';
import { Link  } from "react-router-dom";
import { Table } from 'reactstrap';

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
// This component is created as a class because there is a need to remeber the selected room, as a state.

class TimeTable extends React.Component {
    constructor() {
      super();

      this.state = {
        selectedRoom: '',
        roomsList: [],
        activities: []
      };

    }

    async componentDidMount() {

      await this.getRoomOptions();

      if (this.state.roomsList.length > 0 && this.state.selectedRoom !== ' ') {
        this.state.selectedRoom = this.state.roomsList[0];
      }

      await this.getRoomActivities();
    }

    componentWillUnmount() {
      this.setState = (state,callback)=>{
        return;
      };
    }

    async getRoomOptions() {
      return await fetch(`/dictionaryList?dictionary=rooms`)
      .then(response => response.json())
      .then(data => this.setState({roomsList: data}))
    }

    async getRoomActivities() {
      return await fetch(`/activities?room=${this.state.selectedRoom}`)
      .then(response => response.json())
      .then(data => this.setState({activities: data}))
    }

    generateRoomSelection = () => {
      return (
      <select name="select-room" value={this.state.selectedRoom} onChange={e => this.changeRoom(e.target.value)} >
        {(this.state.roomsList).map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      )
    }

    changeRoom(newRoom) {
      this.setState({
        selectedRoom: newRoom
      })
      this.getRoomActivities();
    }

    generateColumns() {
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

    goToActivityDetails(row, col) {
      let room = this.state.selectedRoom;
      return { pathname: "activityDetail", state: {room, row, col}}
    }

    generateTableData() {

      let rows = [];
      for (const row of rowsHeaders) {
        let columns = [];
        for (const col of columnsHeaders) {
          var data;
          if (col === '#') {
            data = row;
            columns.push (
              <td className="col">
                  {data}
              </td>
            );
          } else {
            data = "X"
            for(const [key, value] of Object.entries(this.state.activities)) {
              if (value["slot"] === row && value["day"] === col) {
                data = value["group"];
              }
            }

            columns.push (
              <td key className="col">
                  <Link to = {this.goToActivityDetails(row, col)} className="btn btn-primary">
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

    render() {
      return (
        <div id = 'root'>
        <label>Room</label>
          {this.generateRoomSelection()}
          <h3 id='title'>SchoolData</h3>
            <Table striped>
              <tbody>
                {this.generateColumns()}
                {this.generateTableData()}
              </tbody>
            </Table>
        </div>
      );
    }

}


export default TimeTable;