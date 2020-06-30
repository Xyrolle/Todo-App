import React, { useContext, useState } from 'react';

import { TodosContext } from '../context/TodosContext';

import '../styles/Topbar.css';

type CategoryProps = {
	name: string;
};

const Topbar: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	const { filter } = useContext(TodosContext);
	const [ filterString, updateFilterString ] = filter;
	return (
		// connect to context and pass to it string from this input
		// then read this string in todos and show only those todos
		// which match the string
		// cast to lower case and check not for the strict equality
		<div className='topbar'>
			<input placeholder='search...' />
			<h1>
				{
					name ? name :
					'todos'}
			</h1>
		</div>
	);
};

export default Topbar;
