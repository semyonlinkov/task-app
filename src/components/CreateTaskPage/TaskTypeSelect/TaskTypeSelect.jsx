import React, { useState } from "react";
import Select from 'react-select';

const TypeTaskSelect = ({ values, setValue }) => {
	const [selectedValue, setSelectedValue] = useState('');

	const handleChange = (e) => {
		setSelectedValue(e.value);
		setValue(e.value);
	};

	// console.log(selectedValue);

	return <>
		<Select
			options={values.map((taskName) => ({ value: taskName, label: taskName }))}
			value={values
				.map((taskName) => ({ value: taskName, label: taskName }))
				.find((obj) => obj.value === selectedValue)}
			onChange={handleChange}
		/></>;
};

export default TypeTaskSelect;
