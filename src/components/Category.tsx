import React from 'react';
import { Link } from 'react-router-dom';

type CategoryProps = {
	name: string;
};

const Category: React.FC<CategoryProps> = ({ name }: CategoryProps) => {
	return (
		<div>
			<Link to={`/${name}`}>
				<h2>name</h2>
			</Link>
		</div>
	);
};

export default Category;
