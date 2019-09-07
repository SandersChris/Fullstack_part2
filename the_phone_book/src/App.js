import React, { useState } from 'react'
import Persons from './components/persons'
import FormComponent from './components/form'
import Heading from './components/heading'
import FormFilter from './components/formfilter'

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
      <Heading heading='PhoneBook' />
        <FormFilter handleFilterAdd={handleFilterAdd} />
      <Heading heading='Add Contact' />
        <FormComponent  addPerson={addPerson} 
                        newName={newName} 
                        newNumber={newNumber} 
                        handleNumberAdd={handleNumberAdd} 
                        handleNameAdd={handleNameAdd} />
      <Heading heading='Number' />
        <Persons persons={nameFilter()} numbers={nameFilter()}/>
    </div>
  )
}

export default App;
