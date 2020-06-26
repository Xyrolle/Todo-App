import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Todos from './components/Todos';

import Modal from './components/Modal';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';

import './App.css';

const App: React.FC = () => {
	return (
		<div className='App'>
			<Modal />
			<Router>
				<Route path='/:categoryName' render={(props) => <Topbar name={props.match.params.categoryName} />} />
				<Route path='/' exact component={Topbar} />
				<Sidebar />
				<Route exact path='/' component={Todos} />
				<Route
					exact
					path='/:categoryName'
					render={(props) => <Todos name={props.match.params.categoryName} />}
				/>
			</Router>
		</div>
	);
};

export default App;
