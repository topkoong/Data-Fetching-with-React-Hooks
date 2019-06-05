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
		<div className='container max-w-md mx-auto p-4 m-2 bg-purple-100 shadow-lg rounded'>
      <img src="https://icon.now.sh/react/c0c" alt="React Logo" className='float-right h-12'/>
      <h1 className='text-gray-900 text-lg font-thin'>Hooks News</h1>
			<form onSubmit={handleSearch} className='mb-2'>
				<input
					type="text"
					onChange={event => setQuery(event.target.value)}
					value={query}
          ref={searchInputRef}
          className='border p-1 rounded'
				/>
				<button type="submit" className='bg-orange-600 rounded m-1 p-1'>Search</button>
				<button type="button" onClick={handleClearSearch} className='bg-teal-600 text-white rounded m-1 p-1'>
					Clear
				</button>
			</form>

			{loading ? (
				<div className='font-bold text-orange-900'>Loading results...</div>
			) : (
				<ul className='list-none leading-normal'>
					{results.map(({ objectID, url, title }) => (
						<li key={objectID}>
							<a href={url} className='text-indigo-600 hover:text-indigo-900'>{title}</a>
						</li>
					))}
				</ul>
      )}
      {error && <div className='text-red-600 font-bold'>{error.message}</div>}
		</div>
	);
}
