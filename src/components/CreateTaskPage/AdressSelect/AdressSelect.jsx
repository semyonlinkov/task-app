import React, { useEffect, useState } from 'react';
import styles from './ObjectSelect.module.scss';

const WorkerSelect = ({ setValue, allObjects, title }) => {
	const [searchedAdresses, setSearchedAdresses] = useState([]);
	const [searchedObject, setSearchedObject] = useState('');

	const searchHandler = (str) => {
		if (str) {
			setSearchedAdresses([...allObjects].filter((worker) => worker.NAME.toLowerCase().includes(str.toLowerCase())));
		} else {
			setSearchedAdresses([]);
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
			{searchedAdresses && (
				<ul className={styles.select_dropdown}>
					{searchedAdresses.map((person) => (
						<li
							key={person.ID}
							onClick={() => {
								setValue(`${person.ID}:${person.NAME}`);
								setSearchedObject(person.NAME);
								setSearchedAdresses([]);
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
