import React from 'react';

function EditDictionary(props) {
    const [dictionaryList, setGrousetDictionary] = React.useState([]);

    React.useEffect(() => {
        async function fetchDictionary() {
            let response = await fetch(`/dictionaryList?dictionary=${props.location.state.dictionary}`)
            response = await response.json()
            setGrousetDictionary(response)
        }

        fetchDictionary();

    }, [props.location.state.dictionary])   // Watched for changes. Ensures re-render when props value changed.

    const goToTimeTable = () => {
        console.log(props.location.state.room)
        let room = props.location.state.room;
        console.log("det", {room});
        return { pathname: "/", state: {room}}
    }

    const removeEntry = (entry) => () => {
        console.log(entry.r)
        fetch(`/removeDictionaryEntry?dictionary=${props.location.state.dictionary}&entry=${entry.r}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
    }

    return (
    <div>
        <div>
        {dictionaryList.map(r =>
                <form id={r} method="post" action={`/removeDictionaryEntry?dictionary=${props.location.state.dictionary}&entry=${r}`}></form>
           )}
        </div>

    <div>Dictionary: {props.location.state.dictionary}
        <form action={goToTimeTable}>
        <table>
        <tbody>
            {dictionaryList.map(r =>
                <tr>
                    <td>
                        <input className="input-data" type="text" key={r} value={r} readOnly></input>
                    </td>
                    <td>
                        <div>
                            <button type="submit" form={r}>Remove</button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <button type="submit" form={r, r}>Edit</button>
                        </div>
                    </td>
                </tr>)}
        </tbody>
        </table>
        <input type="submit"></input>
        </form>
    </div>
    </div>
    )
}

export default EditDictionary;