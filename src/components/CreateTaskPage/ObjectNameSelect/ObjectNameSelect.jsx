import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { $allObjects } from '../../../store/getAllObjects';
import styles from './ObjectNameSelect.module.scss';

const ObjectNameSelect = ({ setValue, watch }) => {
	const allObjects = useStore($allObjects);

	const [searchedObjectNames, setSearchedObjectNames] = useState([]);
	const [searchedObjectName, setSearchedObjectName] = useState('');

	const searchHandler = (str) => {
		if (str.length > 2) {
			if (str) {
				setSearchedObjectNames(
					[...allObjects].filter((object) => object.Name.toLowerCase().includes(str.toLowerCase())),
				);
			} else {
				setSearchedObjectNames([]);
			}
		} else {
			setSearchedObjectNames([]);
		}
	};

	useEffect(() => {
		const close = (e) => setSearchedObjectNames([]);
		document.body.addEventListener('click', close);
		return () => document.body.removeEventListener('click', close);
	}, []);

	useEffect(() => {
		if (watch()?.objectName) {
			setSearchedObjectName(watch().objectName);
		}
	}, [watch().objectName]);

	return (
		<label className={styles.wrapper}>
			<input
				type="text"
				onChange={(e) => {
					setSearchedObjectName(e.target.value);
					searchHandler(e.target.value);
				}}
				value={searchedObjectName}
			/>
			{searchedObjectNames && (
				<ul className={styles.select_dropdown}>
					{searchedObjectNames.map((obj) => (
						<li
							key={obj.ObjectID}
							onClick={(e) => {
								const number = +obj.ObjectNumber;

								setValue('objectName', obj.Name);
								setValue('objectAdress', obj.Address);
								setValue('objectNumber', number.toString(16));
								setSearchedObjectName(obj.Name);
								setSearchedObjectNames([]);
							}}>
							{obj.Name}
						</li>
					))}
				</ul>
			)}
		</label>
	);
};

export default ObjectNameSelect;
