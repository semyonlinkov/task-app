import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { $allObjects } from '../../../store/getAllObjects';
import styles from './ObjectNameSelect.module.scss';

const ObjectNameSelect = ({ setValue, watch }) => {
	const allObjects = useStore($allObjects);

	const [searchedObjectNames, setSearchedObjectNames] = useState([]);
	const [searchedObjectName, setSearchedObjectName] = useState('');

	const searchHandler = (str) => {
		if (str.length > 3) {
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
		setSearchedObjectName(watch().objectName);
	}, [watch().objectName]);

	return (
		<label>
			<input
				type="text"
				onChange={(e) => {
					searchHandler(e.target.value);
					setSearchedObjectName(e.target.value);
				}}
				value={searchedObjectName}
			/>
			{searchedObjectNames && (
				<ul className={styles.select_dropdown}>
					{searchedObjectNames.map((obj) => (
						<li
							key={obj.ObjectID}
							onClick={() => {
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
