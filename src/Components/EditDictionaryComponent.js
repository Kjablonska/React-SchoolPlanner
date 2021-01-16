import React from 'react';
import { Link  } from "react-router-dom";

function EditDictionary(props) {
    const [dictionaryList, setDictionaryList] = React.useState([]);
    const [dictionary, setDictionary] = React.useState("");

    React.useEffect(() => {
        console.log(props)
        if (props.location['state'] !== undefined && props.location.state['dictionary'] !== undefined)
            setDictionary(props.location.state.dictionary)

        getDict();
    }, [props])

    React.useEffect(() => {
        getDict();
    }, [dictionary])

    const getDict = async function() {
        console.log("getting list");
        let response = await fetch(`/dictionaryList?dictionary=${dictionary}`)
        response = await response.json()
        setDictionaryList(response)
    }

    const removeEntry = async function(entry, dict) {
        await fetch(`/removeDictionaryEntry`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dictionary: `${dict}`, entry: `${entry}`})
        })
        getDict()
    }

    const goToEditEntry = (entry) => {
        return { pathname: "editEntry", state: {entry, dictionary}}
    }

    return (
    <div>

    <div>Dictionary: {dictionary}
        <table>
        <tbody>
            {dictionaryList.map(r =>
                <tr>
                    <td key={r}>
                        <input className="input-data" type="text" key={r} value={r} readOnly></input>
                    </td>
                    <td>
                        <div>
                            <button key="remove" onClick={() => removeEntry(r, dictionary)}>Remove</button>
                        </div>
                    </td>
                    <td>
                        <div>
                            <Link to = {goToEditEntry(r)} className="btn btn-primary">
                            <button key="edit">Edit</button>
                            </Link>
                        </div>
                    </td>
                </tr>)}
        </tbody>
        </table>
        <Link to = {goToEditEntry('')} className="btn btn-primary">
            <button>Add</button>
        </Link>
    </div>
    </div>
    )
}

export default EditDictionary;