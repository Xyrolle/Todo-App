import React, { useContext } from 'react';

import { TodosContext } from '../context/TodosContext';

import '../styles/Topbar.css';

type CategoryProps = {
	name: string;
};

const Topbar: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	const { filter, sort } = useContext(TodosContext);
	const [ filterString, updateFilterString ] = filter;
	const [ , updateSorted ] = sort;

	const handleChange = (e: any) => {
		updateFilterString(e.target.value);
	};

	const handleSort = (e: any) => {
		updateSorted((sorted: Boolean) => !sorted);
	};

	return (
		<div className='topbar'>
			<input placeholder='search...' value={filterString} onChange={handleChange} />
			<button onClick={handleSort}>Sort</button>
			<h1>
				{
					name ? name :
					'todos'}
			</h1>
		</div>
	);
};

export default Topbar;
