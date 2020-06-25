import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Todos from './components/Todos';
import AddTodoForm from './components/AddTodoForm';

const App: React.FC = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route exact path='/' component={Todos} />
					<Route exact path='/add' component={AddTodoForm} />
				</Switch>
			</Router>
		</div>
	);
};

export default App;
