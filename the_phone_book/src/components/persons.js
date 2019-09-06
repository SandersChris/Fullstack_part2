import React from 'react';

const Persons = ({persons}) => 
    persons.map((x) => <p key={x.id}>{x.name} {x.number}</p>)
export default Persons