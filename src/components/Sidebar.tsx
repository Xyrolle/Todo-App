import React from 'react';

import Categories from './Categories';
import AddCategory from './AddCategory';

import '../styles/Sidebar.css';

const Sidebar: React.FC = () => {
	return (
		<div className='sidebar'>
			<h1>Categories</h1>
			<Categories />
			<AddCategory />
		</div>
	);
};

export default Sidebar;
