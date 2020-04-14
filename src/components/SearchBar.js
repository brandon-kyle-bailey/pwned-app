import React, { useState } from 'react';


// Example GET method implementation:
async function getData(url = '') {
    // Default options are marked with *
    const response = await fetch(url)
      .then(res => res.json())
      .then(data => data);
    return response; // parses JSON response into native JavaScript objects
  }


function SearchBar() {


    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();

        const [domain, zone] = searchTerm.split(".");
        const url = `https://api.domainsdb.info/v1/domains/search?domain=${domain}&zone=${zone}`
        getData(url).then(data => {
            if(data.hasOwnProperty("message")) {
                setSearchResults([{domain:data.message}]);
            } else {
                console.log("got to this branch");
                setSearchResults(data.domains.filter(item => item.isDead === "False"));
            }

            console.log(data);
        });
    }

    return (
        <div>
<h1>Can I use this domain?</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="'facebook.com'" value={searchTerm} onChange={handleChange} />
          <input type="submit" value="Search" />
        </form>
        <ul>
           {searchResults.map(item => (
            <li>{item.domain}</li>
          ))}
        </ul>        
        </div>
    );
}

export default SearchBar;