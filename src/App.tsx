import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Todos from './components/Todos';

import Categories from './components/Categories';
import AddCategory from './components/AddCategory';

import Modal from './components/Modal';
import Sidebar from './components/Sidebar';

import './App.css';

const App: React.FC = () => {
	return (
		<div className='App'>
			<Sidebar />
			<Todos />
			<Modal />
		</div>
	);
};

export default App;
