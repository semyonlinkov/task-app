import React, { useEffect, useState } from 'react';
import styles from './WorkerSelect.module.scss';

const WorkerSelect = ({ setValue, allWorkers, title, setSearchBy }) => {
	const [searchedWorkers, setSearchedWorkers] = useState([]);
	const [searchedWorker, setSearchedWorker] = useState('');

	const searchHandler = (str) => {
		if (str) {
			setSearchedWorkers([...allWorkers].filter((worker) => worker.NAME.toLowerCase().includes(str.toLowerCase())));
		} else {
			setSearchedWorkers([]);
		}
	};

	useEffect(() => {
		const close = (e) => setSearchedWorkers([]);
		document.body.addEventListener('click', close);
		return () => document.body.removeEventListener('click', close);
	}, []);

	useEffect(() => {
		if (searchedWorker) {
			setSearchBy('name');
		} else {
			setSearchBy('none');
		}
	}, [searchedWorker]);

	return (
		<label className={styles.wrapper}>
			<p>{title}</p>
			<input
				type="text"
				onChange={(e) => {
					searchHandler(e.target.value);
					setSearchedWorker(e.target.value);
				}}
				value={searchedWorker}
			/>
			{searchedWorkers && (
				<ul className={styles.select_dropdown}>
					{searchedWorkers.map((person) => (
						<li
							key={person.ID}
							onClick={() => {
								setValue('executor', `${person.ID}:${person.NAME}`);
								setValue('coexecutor', '');
								setValue('department', person.DEPARTAMENT);
								setSearchedWorker(person.NAME);
								setSearchedWorkers([]);
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
