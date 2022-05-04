import React, { useState } from 'react';

const WorkerSelect = () => {
	const [allWorkers, setAllWorkers] = useState([]);
	const [searchedWorkers, setSearchedWorkers] = useState([]);
	const [searchedWorker, setSearchedWorker] = useState('');

	const searchHandler = (str) => {
		if (str) {
			setSearchedWorkers([...allWorkers].filter((worker) => worker.NAME.toLowerCase().includes(str.toLowerCase())));
		} else {
			setSearchedWorkers([]);
		}
	};

	return (
		<label>
			<p>Выбрать исполнителя по имени</p>
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
					{[...searchedWorkers].map((person) => (
						<li
							key={person.ID}
							onClick={() => {
								setValue('executor', `${person.ID}:${person.NAME}`);
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
