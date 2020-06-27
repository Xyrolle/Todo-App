import React from 'react';

import '../styles/Topbar.css';

type CategoryProps = {
	name: string;
};

const Topbar: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	return (
		<div className='topbar'>
			<h1>
				{
					name ? name :
					'todos'}
			</h1>
		</div>
	);
};

export default Topbar;
