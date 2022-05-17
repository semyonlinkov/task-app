import React, { useEffect, useState } from 'react';
import styles from './ObjectSelect.module.scss';

const WorkerSelect = ({ setValue, allObjects, title }) => {
	const [searchedObjects, setSearchedObjects] = useState([]);
	const [searchedObject, setSearchedObject] = useState('');

	const searchHandler = (str) => {
		if (str) {
			setSearchedObjects([...allObjects].filter((worker) => worker.NAME.toLowerCase().includes(str.toLowerCase())));
		} else {
			setSearchedObjects([]);
		}
	};

	// useEffect(() => {
	// 	if (searchedObject) {
	// 		setSearchBy('name');
	// 	} else {
	// 		setSearchBy('none');
	// 	}
	// }, [searchedObject]);

	return (
		<label>
			<p>{title}</p>
			<input
				type="text"
				onChange={(e) => {
					searchHandler(e.target.value);
					setSearchedObject(e.target.value);
				}}
				value={searchedObject}
			/>
			{searchedObjects && (
				<ul className={styles.select_dropdown}>
					{searchedObjects.map((person) => (
						<li
							key={person.ID}
							onClick={() => {
								setValue(`${person.ID}:${person.NAME}`);
								setSearchedObject(person.NAME);
								setSearchedObjects([]);
							}}>
							{person.NAME} | {person.DEPARTAMENT}
						</li>
					))}
				</ul>
			)}
		</label>
	);
};

export default WorkerSelect;
