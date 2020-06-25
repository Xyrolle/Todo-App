import React from 'react';

import ITodo from '../interfaces/ITodo';

import '../styles/Todo.css';

const Todo: React.FC<ITodo> = (todo: ITodo) => {
	return (
		<div className='todo'>
			{todo.title} {todo.description}
		</div>
	);
};

export default Todo;
