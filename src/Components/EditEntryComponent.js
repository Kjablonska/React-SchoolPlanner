import React from 'react';
import { Link } from "react-router-dom";

function EditEntry(props) {

    const saveEntry = async function (event) {
        event.preventDefault();
        var editValue = document.getElementById("entry").value;
        if (editValue === '') {
            return props.history.push({ pathname: "editDictionary", state: { dictionary: props.location.state.dictionary } });
        }

        if (props.location.state.entry === '')
            addEntry(editValue);
        else
            editEntry(editValue);
    }

    const addEntry = async function (editValue) {
        await fetch(`/addDictionaryEntry`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dictionary: `${props.location.state.dictionary}`, newEntry: `${editValue}` })
        }).then(() => {
            props.history.push({ pathname: "editDictionary", state: { dictionary: props.location.state.dictionary } });
        });
    }

    const editEntry = async function (editValue) {
        await fetch(`/editDictionaryEntry`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dictionary: `${props.location.state.dictionary}`, entry: `${props.location.state.entry}`, newEntry: `${editValue}` })
        }).then(() => {
            props.history.push({ pathname: "editDictionary", state: { dictionary: props.location.state.dictionary } });
        });
    }

    const cancelEdit = () => {
        let dict = props.location.state.dictionary;
        return { pathname: "editDictionary", state: { dictionary: dict } };
    }


    return (
        <div className="div-spaces">
            <form onSubmit={saveEntry}>
                <br></br>
                <input type="text" id="entry" defaultValue={props.location.state.entry}></input>
                <button className="button1" type="submit">Save</button>
            </form>
            <div>
                <Link to={cancelEdit} className="btn btn-primary">
                    <button className="button5" >Cancel</button>
                </Link>
            </div>
        </div>
    )
}

export default EditEntry;