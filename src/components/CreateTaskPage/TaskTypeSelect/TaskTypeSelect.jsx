import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const TypeTaskSelect = ({ setValue, workers, watch, values }) => {
	const [selectedValue, setSelectedValue] = useState('Другое');

	const handleChange = (e) => {
		setSelectedValue(e.value);
		setValue('type', e.value);

		const setDepartmentAndEmployees = (department) => {
			if (department) {
				setValue('department', department);
				setValue('executor', `${workers[department][0].ID}:${workers[department][0].NAME}`);
				// setValue('coexecutor', `${workers[department][0].ID}:${workers[department][0].NAME}`);
			} else {
				setValue('department', '');
				setValue('executor', '');
				// setValue('coexecutor', '');
			}
		};

		if (e.value === 'Позвонить' || e.value === 'Сделать договор' || e.value === 'Другое') {
			//* Без отдела
			setDepartmentAndEmployees();
		} else if (
			e.value === 'Заявка' ||
			e.value === 'Претензия' ||
			e.value === 'Претензия от пульта' ||
			e.value === 'Снятие объемов' ||
			e.value === 'Демонтаж' ||
			e.value === 'Монтаж' ||
			e.value === 'Нет контрольного события' ||
			e.value === 'Исключить ключ' ||
			e.value === 'Прошить/Сделать ключ' ||
			e.value === 'Установить сторожок' ||
			e.value === 'Перенести оборудование'
		) {
			//* Тех отдел
			setDepartmentAndEmployees('Инженерный');
		} else if (e.value === 'Сделать MyAlarm') {
			setDepartmentAndEmployees('Инженерный');
		} else if (
			e.value === 'Приостановить/Возобновить договор на охрану' ||
			e.value === 'Расторжение договора' ||
			e.value === 'Клиент запрашивает стоимость услуг'
		) {
			setDepartmentAndEmployees('Маркетинг');
		} else if (
			e.value === 'Клиент запрашивает стоимость физ охраны' ||
			e.value === 'Клиент запрашивает возможность сопровождения'
		) {
			setDepartmentAndEmployees('Физ охрана');
		}
	};

	useEffect(() => {
		watch(); //! без watch не меняется value и не происходит ререндер
	}, [selectedValue]);

	useEffect(() => {
		setValue('type', values[0]);
	}, []);

	return (
		<Select
			options={values.map((taskName) => ({ value: taskName, label: taskName }))}
			value={values
				.map((taskName) => ({ value: taskName, label: taskName }))
				.find((obj) => obj.value === selectedValue)}
			onChange={handleChange}
		/>
	);
};

export default TypeTaskSelect;
