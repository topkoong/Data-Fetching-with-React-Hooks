import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('reacthooks');
  
	useEffect(() => {
		getResults();
  }, [query]);
  
	const getResults = async () => {
		const { data } = await axios.get(
			`http://hn.algolia.com/api/v1/search?query=${query}`
		);
		setResults(data.hits);
	};
	return (
		<>
      <input type="text" onChange={event => setQuery(event.target.value)}/>
			<ul>
				{results.map(({ objectID, url, title }) => (
					<li key={objectID}>
						<a href={url}>{title}</a>
					</li>
				))}
			</ul>
		</>
	);
}
