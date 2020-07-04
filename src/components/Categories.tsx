import React, { useEffect, Fragment, useContext } from 'react';
import { v4 as uuid_v4 } from 'uuid';

import Category from './Category';

import { ICategory } from '../interfaces/ICategory';
import { TodosContext } from '../context/TodosContext';
import { Fetch } from '../utils/Fetch';

const Categories: React.FC = () => {
	const { categoriesState } = useContext(TodosContext);
	const [ categories, updateCategories ] = categoriesState;

	useEffect(
		() => {
			const URL = 'http://localhost:4000/categories';
			Fetch(URL, (res: any) => updateCategories(res.data));
		},
		[ updateCategories ]
	);

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
