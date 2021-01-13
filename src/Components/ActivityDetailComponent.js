import React from 'react';
import { Link  } from "react-router-dom";

function Activity(props) {
    const [groupsList, setGroups] = React.useState([]);
    const [classesList, setClasses] = React.useState([]);
    const [teachersList, setTeachers] = React.useState([]);

    React.useEffect(() => {
        async function fetchGroupsList() {
            let response = await fetch(`/dictionaryList?dictionary=groups`)
            response = await response.json()
            setGroups(response)
        }

        async function fetchClassesList() {
            let response = await fetch(`/dictionaryList?dictionary=classes`)
            response = await response.json()
            setClasses(response)
        }

        async function fetchTeachersList() {
            let response = await fetch(`/dictionaryList?dictionary=teachers`)
            response = await response.json()
            setTeachers(response)
        }

        fetchGroupsList();
        fetchClassesList();
        fetchTeachersList();
    }, [])

    const goToTimeTable = () => {
        let room = props.location.state.room;
        return { pathname: "/", state: {room}}
    }

    return (
        <div>
        <form action={goToTimeTable}>
        <table>
            <tr>
                <td>Room</td>
                <td>
                    <input name="room" value = {props.location.state.room} readonly/>
                </td>
            </tr>
            <tr>
                <td>Slot</td>
                <td>
                    <input name="slot" value = {props.location.state.row} readonly/>
                </td>
            </tr>
            <tr>
                <td>Day</td>
                <td>
                    <input name="day" value = {props.location.state.col} readonly/>
                </td>
            </tr>
            <tr>
                <td>Group</td>
                <td>
                    <select name="group">
                        {groupsList.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Class</td>
                <td>
                    <select name="class">
                        {classesList.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Teacher</td>
                <td>
                    <select name="teacher" >
                        {teachersList.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
        </table>
        <input type="submit"></input>
        </form>
        <div>
            <Link to = {goToTimeTable()} className="btn btn-primary">
                <button>Cancel</button>
            </Link>
        </div>
        </div>
    )
}

export default Activity;