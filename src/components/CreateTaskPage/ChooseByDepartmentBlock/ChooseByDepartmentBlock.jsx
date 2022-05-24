import React, { useEffect } from 'react';

const ChooseByDepartmentBlock = ({ register, setValue, workers, setSearchBy, getValues }) => {
	useEffect(() => {
		if (getValues().department) {
			setSearchBy('department');
		} else {
			setSearchBy('none');
		}
	}, [getValues()]);

	return (
		<>
			<label>
				<p>Выбрать отдел</p>
				<select
					{...register('department')}
					onChange={(e) => {
						if (e.target.value) {
							setValue('department', e.target.value);
							setValue('executor', `${workers[e.target.value][0].ID}:${workers[e.target.value][0].NAME}`);
							setValue('coexecutor', `${workers[e.target.value][0].ID}:${workers[e.target.value][0].NAME}`);
						} else {
							setValue('department', '');
							setValue('executor', '');
							setValue('coexecutor', '');
						}
					}}>
					{workers !== 'loading' &&
						Object.keys(workers).map((department) => (
							<option key={department} value={department}>
								{department}
							</option>
						))}
				</select>
			</label>
			<label>
				<p>Выбрать исполнителя</p>
				<select {...register('executor')}>
					{getValues().department &&
						Object.values(workers[getValues().department]).map((person) => (
							<option key={person.ID} value={`${person.ID}:${person.NAME}`}>
								{person.NAME}
							</option>
						))}
				</select>
			</label>
			{/*<label>*/}
			{/*	<p>Выбрать наблюдателя</p>*/}
			{/*	<select {...register('coexecutor')}>*/}
			{/*		{getValues().department &&*/}
			{/*			Object.values(workers[getValues().department]).map((person) => (*/}
			{/*				<option key={person.ID} value={`${person.ID}:${person.NAME}`}>*/}
			{/*					{person.NAME}*/}
			{/*				</option>*/}
			{/*			))}*/}
			{/*	</select>*/}
			{/*</label>*/}
		</>
	);
};

export default ChooseByDepartmentBlock;
