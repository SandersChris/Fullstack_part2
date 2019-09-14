import React from 'react';

const Persons = ({ persons, onClick }) => 
    persons.map((x) => 
        <div key={x.id}><p>{x.name} {x.number}</p> 
            <button value={x.id} onClick={onClick}>Delete</button>
        </div>)
export default Persons