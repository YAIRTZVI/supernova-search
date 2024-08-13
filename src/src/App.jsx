// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import hljs from 'highlight.js/lib/core';
import json from 'highlight.js/lib/languages/json';

// Then register the languages you need
hljs.registerLanguage('json', json);

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [jsonData, setJsonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async (searchTerm) => {
    if (!searchTerm) return; // Avoid unnecessary API calls

    setIsLoading(true);
    setError(null); // Clear previous errors

    try {
      const response = await fetch(`https://api.astrocats.space/${searchTerm}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }
      const data = await response.json();
      setJsonData(data);
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "An unexpected error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchTerm);
  }, [searchTerm]); // Run effect only when searchTerm changes

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="App">
      <input
        type="search"
        name="star"
        id="i"
        placeholder="Enter object name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {isLoading && <p>Loading data...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {jsonData && (
        <pre className="">
          <code className="language-json" dangerouslySetInnerHTML={{ __html: hljs.highlight(JSON.stringify(jsonData, null, 2), { language: 'json' }).value }} />
        </pre>
      )}
      {!jsonData && !isLoading && <p>Search for an object to display data.</p>}
    </div>
  );
}

export default App;