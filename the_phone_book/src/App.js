import React, { useState, useEffect } from 'react'
import Persons from './components/persons'
import FormComponent from './components/form'
import Heading from './components/heading'
import FormFilter from './components/formfilter'
import phoneService from './services/persons'
import Notification from './components/error'
import NotificationAdd from './components/add'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newAdd, setNewAdd ] = useState(null)
  const [ newError, setNewError ] = useState(null)

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
    .catch(error => {
      setNewError('Contact has already been removed.')
      setTimeout(() => {
        setNewError(null)
      }, 5000)
    })
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
        .catch(error => {
          setNewError(`${newNumber} has been removed from the server!`)
          setTimeout(() => {
            setNewError(null)
          }, 5000)
        })
      }
    } else {
      phoneService
        .create(phoneObject)
        .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')

        setNewAdd(`${newName} added!`)
        setTimeout(() => {
          setNewAdd(null)
        }, 5000)
        })
        .catch(error => console.log(error))
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
        <NotificationAdd message={newAdd} />
        <FormComponent  addPerson={addPerson} 
                        newName={newName} 
                        newNumber={newNumber} 
                        handleNumberAdd={handleNumberAdd} 
                        handleNameAdd={handleNameAdd} />
      <Heading heading='Number' />
        <Notification message={newError} />
        <Persons persons={nameFilter()} numbers={nameFilter()} onClick={handleClick}/>
    </div>
  )
}

export default App;
