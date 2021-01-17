import React from 'react';
import { Link } from 'react-router-dom';

function EditDictionary(props) {
    const [dictionaryList, setDictionaryList] = React.useState([]);
    const [dictionary, setDictionary] = React.useState('');

    React.useEffect(() => {
        if (props.location['state'] !== undefined &&
            props.location.state['dictionary'] !== undefined)
            setDictionary(props.location.state.dictionary)

        getDict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props])

    React.useEffect(() => {
        if (dictionary !== '' && dictionary !== undefined) getDict();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dictionary])

    React.useEffect(
        () => {
            console.log('dic eff', dictionaryList)
            // eslint-disable-next-line react-hooks/exhaustive-deps
        },
        [dictionaryList])

    async function getDict() {
        let response = await fetch(`/dictionaryList?dictionary=${dictionary}`)
        response = await response.json()
        setDictionaryList(response)

        console.log('dic list', dictionaryList)
    }

    const removeEntry = async function (entry, dict) {
        await fetch(`/removeDictionaryEntry`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dictionary: `${dict}`, entry: `${entry}` })
        })
        getDict()
    }

    const goToEditEntry = (entry) => {
        return {
            pathname: 'editEntry', state: { entry, dictionary }
        }
    }

    const goToTimeTable = () => {
        let room = props.location.state.room;
        return {
            pathname: '/', state: { room }
        }
    }

    return (
        <div className='div-spaces'>

            <div>Dictionary: {dictionary}
                <br></br>
                <table>
                    <tbody>
                        {dictionaryList.map(r =>
                            <tr>
                                <td key={r}>
                                    <input className="input-data" type="text" key={r} value={r} readOnly></input>
                                </td>
                                <td>
                                    <div>
                                        <button className="button3" key="remove" onClick={() => removeEntry(r, dictionary)}>Remove</button>
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <Link to={goToEditEntry(r)} className='btn btn-primary'>
                                            <button className='button1' key='edit'>Edit</button>
                                        </Link>
                                    </div>
                                </td>
                            </tr>)}
                    </tbody>
                </table>
                <Link to={goToEditEntry('')} className="btn btn-primary">
                    <button className="button2">Add</button>
                </Link>
                <Link to={goToTimeTable('')} className="btn btn-primary">
                    <button className="button5">Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default EditDictionary;