import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { TweenMax, Power3 } from 'gsap';
import ContentEditable from 'react-contenteditable';

import { ITodo } from '../interfaces/ITodo';
import { TodosContext } from '../context/TodosContext';

import '../styles/Todo.css';

const todoPriorityStyles = { 1: 'low-priority', 2: 'medium-priority', 3: 'high-priority' };

const Todo: React.FC<ITodo> = (todo: ITodo) => {
	const { rerenderTodos } = useContext(TodosContext);
	const [ , shouldRenderTodos ] = rerenderTodos;

	const deleteTodo = () => {
		shouldRenderTodos((shouldRenderTodos: Boolean) => !shouldRenderTodos);
		axios.get(`http://localhost:4000/delete/todo/${todo.id}`).catch((err) => console.error(err));
	};

	const updateTitle = (e: any) => {
		axios
			.get(`http://localhost:4000/update/todoTitle/${todo.id}?title=${e.target.value}`)
			.catch((err) => console.error(err));
	};

	const updateDescription = (e: any) => {
		axios
			.get(`http://localhost:4000/update/todoDescription/${todo.id}?description=${e.target.value}`)
			.catch((err) => console.error(err));
	};

	useEffect(() => {
		TweenMax.to('.todo', 0.05, {
			opacity: 1,
			y: 20,
			ease: Power3.easeOut,
			stagger: 0.2
		});
	});

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
			<div>
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
		</div>
	);
};

export default Todo;
