import React from 'react';

const CountrySearch = ({ country, onClick }) => {
    const lang = country.map(x => x.languages.map(x => <li>{x.name}</li>))
    const coun = country.map(x => {
        return(
        <div key={x.alpha3Code}>
            <h1>{x.name}</h1>
            <p>Capital: {x.capital}</p>
            <p>Population: {x.population}</p>
            <h2>Languages</h2>
            <ul>{lang}</ul>
            <img src={x.flag} alt='Country flag'></img>
        </div>
        )
    })

    if (country.length > 10) return <p>Too many matches, please specify another filter</p>
    else if (country.length < 10 && country.length > 1) return country.map(x => {
       return(
        <div key={x.name}>
            <p>{x.name}</p>
            <button value={x.name} onClick={onClick}>show {x.name}</button>
        </div>
        )  
    })
    
    else return coun
}

export default CountrySearch