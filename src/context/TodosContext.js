import React, { useState, createContext } from 'react';

export const TodosContext = createContext();

export const TodosProvider = (props) => {
	const [ shouldRenderTodos, updateShouldRenderTodos ] = useState(false);
	const [ shouldRenderCategories, updateShouldRenderCategories ] = useState(false);
	const [ filterString, updateFilterString ] = useState('');
	return (
		<div>
			<TodosContext.Provider
				value={{
					rerenderTodos      : [ shouldRenderTodos, updateShouldRenderTodos ],
					rerenderCategories : [ shouldRenderCategories, updateShouldRenderCategories ],
					filter             : [ filterString, updateFilterString ]
				}}
			>
				{props.children}
			</TodosContext.Provider>
		</div>
	);
};
