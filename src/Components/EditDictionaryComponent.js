import React from 'react';

function EditDictionary(props) {
    console.log(props.location.state.dictionary)

    const [dictionaryList, setGrousetDictionary] = React.useState([]);

    React.useEffect(() => {
        async function fetchDictionary() {
            let response = await fetch(`/dictionaryList?dictionary=${props.location.state.dictionary}`)
            response = await response.json()
            setGrousetDictionary(response)
        }

        fetchDictionary();

    }, [props.location.state.dictionary])   // Watched for changes. Ensures re-render when props value changed.


    return (
    <div>Dictionary: {props.location.state.dictionary}
        <form action='/'>
        <table>
        <tbody>
            {dictionaryList.map(r =>
                <tr><td>
                    <input className="input-data" type="text" key={r} value={r} readOnly></input>
                </td></tr>)}
        </tbody>
        </table>
        <input type="submit"></input>
        </form>
    </div>
    )
}

export default EditDictionary;