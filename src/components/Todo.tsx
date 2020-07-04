import React, { useContext, useEffect } from 'react';
import ContentEditable from 'react-contenteditable';

import { ITodo } from '../interfaces/ITodo';
import { TodosContext } from '../context/TodosContext';
import { animateTodo } from '../utils/AnimateTodo';

import '../styles/Todo.css';
import { Fetch } from '../utils/Fetch';

const todoPriorityStyles = { 1: 'low-priority', 2: 'medium-priority', 3: 'high-priority' };

const Todo: React.FC<ITodo> = (todo: ITodo) => {
	const { todosState } = useContext(TodosContext);
	const [ todos, updateTodos ] = todosState;

	useEffect(() => {
		animateTodo();
	}, []);

	const deleteTodo = () => {
		updateTodos(todos.filter((currentTodo: ITodo) => currentTodo.id !== todo.id));
		const URL = `http://localhost:4000/delete/todo/${todo.id}`;
		Fetch(URL);
	};

	const updateTitle = (e: any) => {
		const URL = `http://localhost:4000/update/todoTitle/${todo.id}?title=${e.target.value}`;
		Fetch(URL);
	};

	const updateDescription = (e: any) => {
		const URL = `http://localhost:4000/update/todoDescription/${todo.id}?description=${e.target.value}`;
		Fetch(URL);
	};

	const updatePriority = (e: any) => {
		const newPriority = todo.priority % 3 + 1;
		const URL = `http://localhost:4000/update/todoPriority/${todo.id}?priority=${newPriority}`;
		Fetch(URL);
		let updatedTodos: ITodo[] = todos.map((currentTodo: ITodo) => {
			if (currentTodo.id === todo.id) currentTodo.priority = newPriority;
			return currentTodo;
		});
		updateTodos(updatedTodos);
	};

	return (
		<div className={'todo ' + todoPriorityStyles[todo.priority]}>
			<button className='delete' onClick={deleteTodo}>
				&times;
			</button>
			<ContentEditable html={todo.title} spellCheck={false} className='todo-title' onChange={updateTitle} />
			<ContentEditable
				html={todo.description}
				spellCheck={false}
				className='todo-description'
				onChange={updateDescription}
			/>
			<div className='date'>
				Created At:{' '}
				{
					todo.createdAt ? <span className='todo-date'>
						{todo.createdAt.toString().substring(0, 3) + ' ' + todo.createdAt.toString().substring(3, 7)}
					</span> :
					null}
				<br />
				Updated At:{' '}
				{
					todo.updatedAt ? <span className='todo-date'>
						{todo.updatedAt.toString().substring(0, 3) + ' ' + todo.updatedAt.toString().substring(3, 7)}
					</span> :
					null}
			</div>
			<span className='priority' onClick={updatePriority}>
				Priority: {todo.priority}{' '}
			</span>
		</div>
	);
};

export default Todo;
