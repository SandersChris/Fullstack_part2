import React, {useState, useEffect } from 'react';
import axios from 'axios';
import FormFilter from './components/formFilter';
import CountrySearch from './components/country';

function App() {
  const [country, setCountry] = useState([])
  const [ newFilter, setNewFilter ] = useState('')

  const handleFilterAdd = (event) => setNewFilter(event.target.value)

  const hook = () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response => setCountry(response.data))
  }

  useEffect(hook, [])

  const nameFilter = () => {
    const name = country.filter(x => x.name.toLowerCase().includes(newFilter.toLowerCase()))
    return name
  }

  console.log(country)

  const handleClick = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }
  return (
    <div>
      <FormFilter handleFilterAdd={handleFilterAdd} />
      <CountrySearch country={nameFilter()} onClick={handleClick} />
    </div>
  );
}

export default App;
