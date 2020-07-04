import React, { useState, createContext } from 'react';

export const TodosContext = createContext();

export const TodosProvider = (props) => {
	const [ todos, updateTodos ] = useState([]);
	const [ categories, updateCategories ] = useState([]);
	const [ filterString, updateFilterString ] = useState('');
	const [ sorted, updateSorted ] = useState(false);
	return (
		<div>
			<TodosContext.Provider
				value={{
					todosState      : [ todos, updateTodos ],
					categoriesState : [ categories, updateCategories ],
					filter          : [ filterString, updateFilterString ],
					sort            : [ sorted, updateSorted ]
				}}
			>
				{props.children}
			</TodosContext.Provider>
		</div>
	);
};
