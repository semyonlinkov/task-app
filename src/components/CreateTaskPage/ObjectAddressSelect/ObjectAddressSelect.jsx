import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import { $allObjects } from '../../../store/getAllObjects';
import styles from './ObjectAddressSelect.module.scss';

const ObjectAddressSelect = ({ setValue, watch }) => {
	const allObjects = useStore($allObjects);

	const [searchedObjectAddresses, setSearchedObjectAdresses] = useState([]);
	const [searchedObjectAddress, setSearchedObjectAddress] = useState('');

	const searchHandler = (str) => {
		if (str.length > 3) {
			if (str) {
				setSearchedObjectAdresses(
					[...allObjects].filter((object) => object.Address.toLowerCase().includes(str.toLowerCase())),
				);
			} else {
				setSearchedObjectAdresses([]);
			}
		} else {
			setSearchedObjectAdresses([]);
		}
	};

	useEffect(() => {
		setSearchedObjectAddress(watch().objectAdress);
	}, [watch().objectAdress]);

	return (
		<label>
			<input
				type="text"
				onChange={(e) => {
					searchHandler(e.target.value);
					setSearchedObjectAddress(e.target.value);
				}}
				value={searchedObjectAddress}
			/>
			{searchedObjectAddresses && (
				<ul className={styles.select_dropdown}>
					{searchedObjectAddresses.map((obj) => (
						<li
							key={obj.ObjectID}
							onClick={() => {
								const number = +obj.ObjectNumber;

								setValue('objectName', obj.Name);
								setValue('objectAdress', obj.Address);
								setValue('objectNumber', number.toString(16));
								setSearchedObjectAddress(obj.Address);
								setSearchedObjectAdresses([]);
							}}>
							{obj.Address}
						</li>
					))}
				</ul>
			)}
		</label>
	);
};

export default ObjectAddressSelect;
