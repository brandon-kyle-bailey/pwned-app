import React, { useState } from 'react';

import '../css/SearchBar.css';



// Example GET method implementation:
async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url)
      .then(res => res.json())
      .then(data => data);
    return response; // parses JSON response into native JavaScript objects
  }


function FoundDomains(props) {
  return(
  <div className="domains-list">
    <h3 className="domains-found">Uh oh! looks like this domain is in use!</h3>
    <ul className="domains-container-grid">
      {props.results.map(item => (
      <li key={props.results.indexOf(item)}>{item.domain}</li>
      ))}
    </ul>
  </div>
  );
};


function NotFoundDomains(props) {
  return(
    <div>
      <h3 className="no-domains">No domains found for {props.domain}!</h3>
    </div>
  );
};


function SearchBar() {


    const [searchTerm, setSearchTerm] = useState("");
    const [resultsFound, setResultsFound] = useState(false);
    const [searchHasOccured, setSearchHasOccured] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        setSearchHasOccured(false);
        setResultsFound(false);

        console.log("CURRENT DOMAIN : ", process.env.REACT_APP_DOMAIN);

        const [domain, zone] = searchTerm.split(".");
        // const url = `https://api.domainsdb.info/v1/domains/search?domain=${domain}&zone=${zone}`
        const url = `${process.env.REACT_APP_DOMAIN}/v1/domains/search?domain=${domain}&zone=${zone}`
        getData(url).then(data => {
            if(data.hasOwnProperty("domains")) {
              setSearchResults(data.domains.filter(item => item.isDead === "False"));
              setResultsFound(true);
            }
            setSearchHasOccured(true);

            console.log(data);
        });
    }

    const result = searchHasOccured ? resultsFound ? <FoundDomains results={searchResults}/> : <NotFoundDomains domain={searchTerm}/> : "";

    return (
      <div className="searchbar-container">
        <h1>Can I use this domain?</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="'facebook.com'" value={searchTerm} onChange={handleChange} />
          <input type="submit" value="Search" />
        </form>
        {result}
      </div>
    );
}

export default SearchBar;
