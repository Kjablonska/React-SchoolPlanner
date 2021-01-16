import React from 'react';
import { Link  } from "react-router-dom";

function EditEntry(props) {

    const saveEntry = async function(event) {
        event.preventDefault();
        var editValue = document.getElementById("entry").value;

        await fetch(`/editDictionaryEntry`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dictionary: `${props.location.state.dictionary}`, entry: `${props.location.state.entry}`, newEntry:`${editValue}`})
        }).then(() => {
            props.history.push({pathname: "editDictionary", state: {dictionary:props.location.state.dictionary}});
        });
    }

    const cancelEdit = () => {
        let dict = props.location.state.dictionary;
       return {pathname: "editDictionary", state: {dictionary:dict}};
    }
    console.log(props.location)

    return (
        <>
            <form onSubmit = {saveEntry}>
                <label for="fname">Edit entry</label>
                <br></br>
                <input type="text" id="entry" defaultValue={props.location.state.entry}></input>
                {/* <Link to = {cancelEdit} className="btn btn-primary"> */}
                    <button type="submit">Save</button>
                {/* </Link> */}
            </form>
            <div>
                <Link to = {cancelEdit} className="btn btn-primary">
                    <button>Cancel</button>
                </Link>
            </div>
        </>
    )
}

export default EditEntry;