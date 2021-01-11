import React from 'react';

function Activity(props) {
    const [g, setGroups] = React.useState(null);
    const [classes, setClasses] = React.useState(null);
    const [teachers, setTeachers] = React.useState(null);
    const groups =  ['1a', '2b'];

    React.useEffect(async () => {
        await fetch(`/dictionaryList?dictionary=groups`)
          .then(response => response.json())
          .then(data => {
            setGroups(data);
          });
      }, []);

    console.log(groups);

    async function getGroupsOptions() {
        return await fetch(`/dictionaryList?dictionary=groups`)
        .then(response => response.json())
    }

    async function getClassesOptions() {
        return await fetch(`/dictionaryList?dictionary=classes`)
        .then(response => response.json())
    }

    async function getTeachersOptions() {
        return await fetch(`/dictionaryList?dictionary=teachers`)
        .then(response => response.json())
    }

    async function getActivityDetails() {
        return await fetch(`activityDetail?room=${props.location.state.room}&day=${props.location.state.day}&slot=${props.location.state.slot}`)
        .then(response => response.json())
    }

    return (
        <form>
        <table>
            <tr>
                <td>Room</td>
                <td>{props.location.state.room}</td>
            </tr>
            <tr>
                <td>Slot</td>
                <td>{props.location.state.row}</td>
            </tr>
            <tr>
                <td>Day</td>
                <td>{props.location.state.col}</td>
            </tr>
            <tr>
                <td>Group</td>
                <td>
                    <select name="select-group">
                        {groups.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Class</td>
                <td>
                    <select name="select-class">
                        {groups.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
            <tr>
                <td>Teacher</td>
                <td>
                    <select name="select-teacher" >
                        {groups.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                </td>
            </tr>
        </table>
        </form>
    )
}

export default Activity;