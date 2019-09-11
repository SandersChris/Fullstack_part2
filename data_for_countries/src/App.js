import React, {useState, useEffect } from 'react';
import axios from 'axios';
import FormFilter from './components/formFilter';
import CountrySearch from './components/country';

function App() {
  const [country, setCountry] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [temperature, setTemperature ] = useState('')
  const [ icons, setIcons ] = useState('')
  const [ windDir, setWindDir ] = useState('')

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

  let capital = nameFilter().map(x => x.capital)
  capital = capital[0]
  
  const params = {
    'access_key': 'b0ac64092f53701d418b3114a7a4b93b',
    'query': capital
  }

  const hook2 = () => {
    axios
    .get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data
      setTemperature(apiResponse.current.temperature)
      setIcons(apiResponse.current.weather_icons)
      setWindDir(apiResponse.current.wind_dir)
    })
    .catch(error => console.log(error))
  }

  useEffect(hook2, [capital])

  console.log(temperature)

  const handleClick = (event) => {
    event.preventDefault()
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <FormFilter handleFilterAdd={handleFilterAdd} />
      <CountrySearch country={nameFilter()} 
                     onClick={handleClick} 
                     temperature={temperature}
                     icon={icons}
                     wind={windDir}/>
    </div>
  );
}

export default App;
