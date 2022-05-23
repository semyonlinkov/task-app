import React, { useState } from 'react';
import Select from 'react-select';

const TypeTaskSelect = ({ setValue, workers }) => {
	const values = [
		'Позвонить',
		'Сделать договор',
		'Заявка',
		'Претензия',
		'Претензия от пульта',
		'Снятие объемов',
		'Демонтаж',
		'Монтаж',
		'Нет контрольного события',
		'Сделать MyAlarm',
		'Прошить/Сделать ключ',
		'Исключить ключ',
		'Установить сторожок',
		'Перенести оборудование',
		'Приостановить/Возобновить договор на охрану',
		'Расторжение договора',
		'Клиент запрашивает стоимость физ охраны',
		'Клиент запрашивает возможность сопровождения',
		'Клиент запрашивает стоимость услуг',
		'Другое',
	];

	const [selectedValue, setSelectedValue] = useState('');

	const handleChange = (e) => {
		setSelectedValue(e.value);
		setValue('type', e.value);

		if (e.value === 'Позвонить' || e.value === 'Сделать договор') {
		} else if (
			e.value === 'Заявка' ||
			e.value === 'Претензия' ||
			e.value === 'Претензия от пульта' ||
			e.value === 'Снятие объемов' ||
			e.value === 'Демонтаж' ||
			e.value === 'Монтаж' ||
			e.value === 'Нет контрольного события' ||
			e.value === 'Сделать MyAlarm' ||
			e.value === 'Прошить/Сделать ключ' ||
			e.value === 'Исключить ключ'
		) {
			setValue('department', 'Инженерный');
			setValue('executor', `${workers['Инженерный'][0].ID}:${workers['Инженерный'][0].NAME}`);
			setValue('coexecutor', `${workers['Инженерный'][0].ID}:${workers['Инженерный'][0].NAME}`);
		} else if (e.value === 'Установить сторожок') {
		} else if (e.value === 'Перенести оборудование') {
		} else if (
			e.value === 'Приостановить/Возобновить договор на охрану' ||
			e.value === 'Расторжение договора' ||
			e.value === 'Клиент запрашивает стоимость услуг'
		) {
			setValue('department', 'Маркетинг');
			setValue('executor', `${workers['Маркетинг'][0].ID}:${workers['Маркетинг'][0].NAME}`);
			setValue('coexecutor', `${workers['Маркетинг'][0].ID}:${workers['Маркетинг'][0].NAME}`);
		} else if (e.value === 'Клиент запрашивает стоимость физ охраны') {
		} else if (e.value === 'Клиент запрашивает возможность сопровождения') {
		} else if (e.value === 'Другое') {
		}
	};

	console.log(workers);

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
