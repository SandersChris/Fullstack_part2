import React from 'react';

const Persons = ({persons}) => persons.map((x) => <p key={x.id}>{x.name}</p>)

export default Persons