import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import FormComponent from './components/form'
import Heading from './components/heading'
import FormFilter from './components/formfilter'
import phoneService from './services/persons'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')

  const handleNameAdd = (event) => setNewName(event.target.value)

  const handleNumberAdd = (event) => setNewNumber(event.target.value)

  const handleFilterAdd = (event) => setNewFilter(event.target.value)

  const hook = () => {
    phoneService
    .getAll()
    .then(response => setPersons(response.data))
  }

  const handleClick = (event) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
    phoneService
    .remove(event.target.value)
    }
  }

  useEffect(hook, [handleClick])
  
  const addPerson = (event) => {
    event.preventDefault() // prevents rerendering
    const phoneObject = {
      name: newName, // takes whatever handleNameAdd returns
      number: newNumber 
    }

    // grabs name attribute from list
    const personNames = persons.map(x => x.name)

    // check for duplicate names
    if (personNames.includes(newName)) {
      if(window.confirm("Are you sure you want to change this contact's number?")) {
        const person = persons.find(p => p.name === newName)
        const id = person.id
        const changedNum = { ...person, number: newNumber }

        phoneService
        .update(id, changedNum)
        .then(response => {
          setPersons(persons.map(person => person.id !== id ? person : response.data)) 
        })
      }
    } else {
      phoneService
        .create(phoneObject)
        .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
        })
      }
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
        <Persons persons={nameFilter()} numbers={nameFilter()} onClick={handleClick}/>
    </div>
  )
}

export default App;
