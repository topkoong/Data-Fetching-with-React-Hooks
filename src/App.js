import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function App() {
  const [results, setResults] = useState([]);
  
	useEffect(() => {
		getResults();
  }, []);
  
	const getResults = async () => {
		const { data } = await axios.get(
			'http://hn.algolia.com/api/v1/search?query=reacthooks'
		);
		setResults(data.hits);
	};
	return (
		<>
      <input type="text"/>
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
