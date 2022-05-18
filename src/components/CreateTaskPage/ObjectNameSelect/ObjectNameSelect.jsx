import { useStore } from 'effector-react';
import { useState } from 'react';
import Select from 'react-select';
import { $allObjects, setSelectedValue } from '../../../store/getAllObjects';

const ObjectNameSelect = ({ setValue }) => {
	const allObjects = useStore($allObjects);

	console.log(allObjects);

	const handleChange = (e) => {
		console.log(e.target);

		setSelectedValue(e.target.value);
		setValue(e.target.value);
	};

	// console.log(selectedValue);

	return (
		<>
			<Select
				options={allObjects.map((obj) => ({ value: obj.Name, label: obj.Name }))}
				value={allObjects
					.map((obj) => ({ value: obj.Name, label: obj.Name }))
					.find((obj) => obj.value === setSelectedValue)}
				onChange={handleChange}
			/>
		</>
	);
};

export default ObjectNameSelect;
