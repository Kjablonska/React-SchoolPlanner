import React from 'react';
// import { Link } from 'react-router-dom'

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
        roomsList: []
      };

      this.init()
    }

    async init() {
      await this.getRoomOptions();
    }

    async getRoomOptions() {
      return fetch('/dictionaryList?dictionary=rooms')
      .then(response => response.json())
      .then(data => this.setState({roomsList: data})) //this.setState = ({roomsList: data}))
    }

    generateRoomSelection = () => {
      return (
      <select name="select-room" value={this.state.selectedRoom} onChange={e => this.setState({ selectedRoom: e.target.value })} >
        {console.log(this.state.roomsList)}
        {(this.state.roomsList).map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      )
    }

    generateColumns() {
      let columns = [];
      columnsHeaders.forEach(item => {
        columns.push(item);
      })

      return columns;
    }

    generateTableData() {
      let rows = [];
      for (var row = 0; row < rowsHeaders.length; row++) {
        let columns = [];
        for (var col = 0; col < columnsHeaders.length; col++) {
          var data;
          if (col === 0) {
            data = rowsHeaders[row];
          } else {
            data = 0;
          }
          columns.push (
            <td key={col} className="col">
                {data}
            </td>
          );
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
        <div>
        <label>Room</label>
          {this.generateRoomSelection()}
          <h3 id='title'>SchoolData</h3>
            <div>
              {this.generateColumns()}
            </div>
            <table>
              <tbody>
                {this.generateTableData()}
              </tbody>
            </table>
        </div>
      );
    }

}
export default TimeTable;