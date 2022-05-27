import React, { useEffect, useState } from 'react';
import styles from './ChangeExecutorForm.module.scss';
import ImhExit from '../../../../../img/closeRed64.png';
import { $workerStatus } from '../../../../../store/workers';
import { useStore } from 'effector-react';
import { setIsLoading } from '../../../../../store/loadingState';
import { changeCustomer } from '../../../../../services-api/changeCustomer';

const ChangeExecutorForm = ({ close, task, user }) => {
	const workers = useStore($workerStatus);

	const [form, setForm] = useState({ id: 0, so_customer: '' });

	const handleSubmit = (form) => {
		if (form.id === 0) {
			alert('Выберите нового исполнителя!');
		}
		changeCustomer(form);
	};

	useEffect(() => {
		if (workers === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
			setForm((prev) => ({
				...prev,
				id: task.id,
				so_customer: workers[task.department][0].NAME,
			}));
		}
	}, [workers]);

	// console.log(task);
	// console.log(user);
	// console.log(form);
	// console.log(workers);
	// console.log(task);

	return (
		<div className={styles.wrapper}>
			<header>
				<p>Сменить исполнителя</p>
				<img src={ImhExit} alt="" onClick={close} />
			</header>
			<div className={styles.form_wrapper}>
				<label>
					<p>Выбрать нового исполнителя</p>
					<select onChange={(e) => setForm((prev) => ({ ...prev, so_customer: e.target.value, id: task.id }))}>
						{workers !== 'loading' &&
							workers[task.department]
								// .filter((person) => person.ID !== task.customerID)
								.map((person) => (
									<option key={person.ID} value={`${person.ID}:${person.NAME}`}>
										{person.NAME}
									</option>
								))}
					</select>
				</label>
			</div>
			<div className={styles.btns_block}>
				<button className={`${styles.btn} ${styles.sub_btn}`} onClick={() => handleSubmit(form)}>
					Сменить исполнителя
				</button>
			</div>
		</div>
	);
};

export default ChangeExecutorForm;
