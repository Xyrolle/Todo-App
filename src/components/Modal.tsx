import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import AddTodoForm from './AddTodoForm';

import '../styles/Modal.css';

const Modal: React.FC = () => {
	const [ showModal, setShowModal ] = useState(false);
	return (
		<div>
			<button className='float-btn' onClick={() => setShowModal(true)}>
				<FontAwesomeIcon icon={faPlus} />
			</button>

			<div
				id='myModal'
				className={
					'modal ' +
					(
						showModal ? 'modal-open' :
						'')
				}
			>
				<div className='modal-content'>
					<span className='close' onClick={() => setShowModal(false)}>
						&times;
					</span>
					<AddTodoForm />
				</div>
			</div>
		</div>
	);
};

export default Modal;
