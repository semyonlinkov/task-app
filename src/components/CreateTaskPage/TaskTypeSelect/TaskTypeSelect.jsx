import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const TypeTaskSelect = ({ setValue, workers, watch, values, getValues }) => {
	const [selectedValue, setSelectedValue] = useState('Другое');

	const handleChange = (e) => {
		setSelectedValue(e.value);
		setValue('type', e.value);

		// console.log(
		// 	values.filter((task) => task.departments.includes(getValues().department) || task.departments[0] === 'Все'),
		// );

		values
			.filter(
				(task) =>
					task.departments.includes(getValues().department) ||
					task.departments[0] === 'Все' ||
					getValues().department === '',
			)
			.forEach((task) => {
				if (e.value === task.taskType && task.departments[0] === 'Все') {
					// setValue('department', '');
					// setValue('executor', '');
				} else if (e.value === task.taskType) {
					setValue('department', task.departments[0]);
					setValue('executor', `${workers[task.departments[0]][0].ID}:${workers[task.departments[0]][0].NAME}`);
				}
			});

		// const setDepartmentAndEmployees = (department) => {
		// 	if (department) {
		// 		setValue('department', department);
		// 		setValue('executor', `${workers[department][0].ID}:${workers[department][0].NAME}`);
		// 		// setValue('coexecutor', `${workers[department][0].ID}:${workers[department][0].NAME}`);
		// 	} else {
		// 		setValue('department', '');
		// 		setValue('executor', '');
		// 		// setValue('coexecutor', '');
		// 	}
		// };

		// if (e.value === 'Позвонить' || e.value === 'Другое') {
		// 	//* Без отдела
		// 	setDepartmentAndEmployees();
		// } else if (
		// 	e.value === 'Заявка' ||
		// 	e.value === 'Претензия' ||
		// 	e.value === 'Претензия от пульта' ||
		// 	e.value === 'Снятие объемов' ||
		// 	e.value === 'Демонтаж' ||
		// 	e.value === 'Монтаж' ||
		// 	e.value === 'Нет контрольного события' ||
		// 	e.value === 'Исключить ключ' ||
		// 	e.value === 'Прошить/Сделать ключ' ||
		// 	e.value === 'Установить сторожок' ||
		// 	e.value === 'Перенести оборудование'
		// ) {
		// 	//* Тех отдел
		// 	setDepartmentAndEmployees('Инженерный');
		// } else if (e.value === 'Сделать MyAlarm') {
		// 	setDepartmentAndEmployees('Инженерный');
		// } else if (
		// 	e.value === 'Сделать договор' ||
		// 	e.value === 'Приостановить/Возобновить договор на охрану' ||
		// 	e.value === 'Расторжение договора' ||
		// 	e.value === 'Клиент запрашивает стоимость услуг'
		// ) {
		// 	setDepartmentAndEmployees('Маркетинг');
		// } else if (
		// 	e.value === 'Клиент запрашивает стоимость физ охраны' ||
		// 	e.value === 'Клиент запрашивает возможность сопровождения'
		// ) {
		// 	setDepartmentAndEmployees('Физ охрана');
		// }
	};

	useEffect(() => {
		watch(); //! без watch не меняется value и не происходит ререндер
	}, [selectedValue]);

	useEffect(() => {
		setValue('type', values[0].taskType);
	}, []);

	return (
		<Select
			options={values
				.filter(
					(task) =>
						task.departments.includes(getValues().department) ||
						task.departments[0] === 'Все' ||
						getValues().department === '',
				)
				.map((task) => ({ value: task.taskType, label: task.taskType }))}
			value={values
				.filter(
					(task) =>
						task.departments.includes(getValues().department) ||
						task.departments[0] === 'Все' ||
						getValues().department === '',
				)
				.map((task) => ({ value: task.taskType, label: task.taskType }))
				.find((obj) => obj.value === selectedValue)}
			onChange={handleChange}
		/>
	);
};

export default TypeTaskSelect;
