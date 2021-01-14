import React from 'react';
import { Link  } from "react-router-dom";

function Activity(props) {
    const [groupsList, setGroups] = React.useState([]);
    const [classesList, setClasses] = React.useState([]);
    const [teachersList, setTeachers] = React.useState([]);
    const [activity, setActivity] = React.useState("");

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

        async function fetchActivityDetail() {
            await fetch(`/activityDetail?room=${props.location.state.room}&slot=${props.location.state.row}&day=${props.location.state.col}`)
            .then(response => response.json()).then(response => setActivity(response)).catch(error => {console.log(error)});
        }

        fetchGroupsList();
        fetchClassesList();
        fetchTeachersList();
        fetchActivityDetail();
    }, [])

    const goToTimeTable = () => {
        let room = props.location.state.room;
        return { pathname: "/", state: {room}}
    }

    const checkActivityEmpty = () => {
        return activity === "" ?
            <Link to = {goToTimeTable()} className="btn btn-primary">
                <button>Unassign</button>
            </Link>
        : <div></div>
    }

    return (
        <div>
        <form>
        <table>
            <tr>
                <td>Room</td>
                <td>
                    <input name="room" value = {props.location.state.room} readOnly/>
                </td>
            </tr>
            <tr>
                <td>Slot</td>
                <td>
                    <input name="slot" value = {props.location.state.row} readOnly/>
                </td>
            </tr>
            <tr>
                <td>Day</td>
                <td>
                    <input name="day" value = {props.location.state.col} readOnly/>
                </td>
            </tr>
            <tr>
                <td>Group</td>
                <td>
                    <select name="group" value={activity.group}>
                        {groupsList.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Class</td>
                <td>
                    <select name="class" value={activity.class}>
                        {classesList.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Teacher</td>
                <td>
                    <select name="teacher"value={activity.teacher}>
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
            {checkActivityEmpty}
        </div>
        </div>
    )
}

export default Activity;