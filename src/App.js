import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export default function App() {
	const [results, setResults] = useState([]);
	const [query, setQuery] = useState('react hooks');
	const searchInputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

	useEffect(() => {
		getResults();
	}, []);

	const getResults = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`
      );
      setResults(data.hits);
    } catch (error) {
      setError(error);
    }
		setLoading(false);
	};

	const handleSearch = event => {
		event.preventDefault();
		getResults();
	};

	const handleClearSearch = () => {
		setQuery('');
		searchInputRef.current.focus();
	};
	return (
		<>
			<form onSubmit={handleSearch}>
				<input
					type="text"
					onChange={event => setQuery(event.target.value)}
					value={query}
					ref={searchInputRef}
				/>
				<button type="submit">Search</button>
				<button type="button" onClick={handleClearSearch}>
					Clear
				</button>
			</form>

			{loading ? (
				<div>Loading results...</div>
			) : (
				<ul>
					{results.map(({ objectID, url, title }) => (
						<li key={objectID}>
							<a href={url}>{title}</a>
						</li>
					))}
				</ul>
      )}
      {error && <div>{error.message}</div>}
		</>
	);
}
