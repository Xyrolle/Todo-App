import React, { useState, useEffect, Fragment } from 'react';
import { v4 as uuid_v4 } from 'uuid';
import axios from 'axios';

import Category from './Category';

import ICategory from '../interfaces/ICategory';

const Categories: React.FC = () => {
	const [ categories, updateCategories ] = useState<ICategory[]>([]);

	useEffect(() => {
		axios
			.get('http://localhost:4000/categories')
			.then((res) => updateCategories(res.data))
			.catch((err) => console.error(err));
	}, []);

	return (
		<Fragment>
			{categories.length &&
				categories.map((category: ICategory) => {
					return <Category name={category.name} key={uuid_v4()} />;
				})}
		</Fragment>
	);
};

export default Categories;
