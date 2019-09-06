import React, { useState } from 'react'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '555-555-5555'},
    { id: 2, name: 'Chris Sanders', number: '555-555-4444'}
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameAdd = (event) => setNewName(event.target.value)

  const handleNumberAdd = (event) => setNewNumber(event.target.value)

  const handleFilterAdd = (event) => setNewFilter(event.target.value)
  
  const addPerson = (event) => {
    event.preventDefault() // prevents rerendering
    const phoneObject = {
      id: persons.length + 1,
      name: newName, // takes whatever handleNameAdd returns
      number: newNumber 
    }

    // grabs name attribute from list
    const personNames = persons.map(x => x.name)

    // check for duplicate names
    personNames.includes(newName) 
    ? alert(`${newName} already exists!`) 
    : setPersons(persons.concat(phoneObject)) // creates new array with new object
    setNewName('') // resets newName to empty string 
  }
  // filters objects down to specified names
  const nameFilter = () => {
    const name = persons.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))
    return name
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <input onChange={handleFilterAdd} />
      <h2>Add a new Number</h2>
      <form onSubmit={addPerson}>
        <div>
          <div>name: <input value={newName} onChange={handleNameAdd}/></div>
          <div>number: <input value={newNumber} onChange={handleNumberAdd}/></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Persons persons={nameFilter()} numbers={nameFilter()}/>
    </div>
  )
}

export default App;
