import React from 'react';
import { Link } from 'react-router-dom';

var columnsHeaders =
    ['#', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

var rowsHeaders = [
    '8:00-8:45', '8:55-9:40', '9:50-11:35', '11:55-12:40', '12:50-13:35',
    '13:45-14:30', '14:40-15:25', '15:35-16:20', '16:30-17:15'
];

function TimeTable(props) {
    const [selectedRoom, setSelectedRoom] = React.useState('');
    const [roomsList, setRooms] = React.useState([]);
    const [activities, setActivities] = React.useState([]);

    React.useEffect(() => {
        if (selectedRoom === '' || selectedRoom === undefined)
            setSelectedRoom(roomsList[0])

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [roomsList])

    React.useEffect(
        () => {
            async function fetchRoomsList() {
                let response = await fetch(`/dictionaryList?dictionary=rooms`)
                response = await response.json()
                setRooms(response)
            }

            fetchRoomsList()
        },
        [])

    React.useEffect(() => {
        async function fetchActivities() {
            let response = await fetch(`/activities?room=${selectedRoom}`)
            response = await response.json()
            setActivities(response)
        }

        if (selectedRoom !== '' || selectedRoom !== undefined) {
            fetchActivities();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedRoom])


    React.useEffect(() => {
        // When going back from editing activity, we want to stay in the same room.
        if (props.location['state'] !== undefined &&
            props.location.state['room'] !== undefined) {
            setSelectedRoom(props.location.state.room);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    const changeRoom =
        (newRoom) => {
            setSelectedRoom(newRoom);
        }

    const goToActivityDetails =
        (row, col) => {
            let room = selectedRoom;
            let slot = row;
            let day = col;
            return {
                pathname: 'activityDetail', state: { room, slot, day }
            }
        }

    const generateRoomSelection =
        () => {
            return (<div className='select-room'><label><b>Room</b></label>&nbsp;<
                select value={selectedRoom} onChange=
                {e => changeRoom(e.target.value)}>{(roomsList).map(
                    r => <option key={r} value={r}>{r}</option>)}
            </select>
            </div>
            )
        }

    const generateColumns = () => {
        let columns = [];
        columnsHeaders.forEach(item => {
            columns.push(
                <th>
                    {item}
                </th>)
        })

        return columns;
    }

    const generateTableData = () => {
        let rows = [];
        for (var row = 0; row < rowsHeaders.length; row++) {
            let columns = [];
            for (const col of columnsHeaders) {
                var data;
                if (col === '#') {
                    data = rowsHeaders[row];
                    columns.push(
                        <td bgcolor='#FDFAEB' className='col td-style'>{data}</td>
                    );
                } else {
                    data = "  "
                    for (const [, value] of Object.entries(activities)) {
                        if (value["slot"] === row && value["day"] === col) {
                            data = value["group"];
                        }
                    }

                    columns.push(
                        <td className="col td-style">
                            <Link to={goToActivityDetails(row, col)} className="btn btn-primary">
                                <button className="table-entry">{data}</button>
                            </Link>
                        </td>
                    );
                }
            }
            rows.push(
                <tr className='tr' key={row} className='row'>
                    {columns}
                </tr>
            );
        }

        return rows;
    }

    return (
        <>
            {generateRoomSelection()}
            <br></br>
            <table className='table'>
                <tbody>
                    <tr bgcolor='#FDFAEB'>{generateColumns()}</tr>
                    {generateTableData()}
                </tbody>
            </table>
        </>
    );

}

export default TimeTable;