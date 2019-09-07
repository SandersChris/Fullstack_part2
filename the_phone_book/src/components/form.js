import React from "react";

const FormComponent = ({handleNameAdd, newName, newNumber, handleNumberAdd, addPerson}) => {
return (
    <form onSubmit={addPerson}>
        <div>
            <div>name: <input value={newName} onChange={handleNameAdd}/></div>
            <div>number: <input value={newNumber} onChange={handleNumberAdd}/></div>
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>
    )
}

export default FormComponent