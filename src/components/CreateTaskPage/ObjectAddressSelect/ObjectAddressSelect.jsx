import React, { useState } from 'react';
import Select from 'react-select';

const ObjectAddressSelect = ({ allObjects, setValue }) => {
	const [selectedValue, setSelectedValue] = useState('');

	const handleChange = (e) => {
		setSelectedValue(e.value);
		setValue(e.value);
	};

	// console.log(selectedValue);
	// console.log(allObjects);

	return (
		<>
			<Select
				options={allObjects.map((obj) => ({ value: obj.Address, label: obj.Address }))}
				value={allObjects
					.map((obj) => ({ value: obj.Address, label: obj.Address }))
					.find((obj) => obj.value === selectedValue)}
				onChange={handleChange}
			/>
		</>
	);
};

export default ObjectAddressSelect;
