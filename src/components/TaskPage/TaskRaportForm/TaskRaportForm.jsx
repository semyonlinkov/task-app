import React, { useState } from 'react';
import styles from './TaskRaportForm.module.scss';
import { useNavigate } from 'react-router-dom';
import { finishTask } from '../../../services-api/finishTask';
import ImhExit from '../../../img/closeRed64.png';
import {setHistory} from "../../../services-api/setHistory";

const TaskRaport = ({ id, timeStart, close, status }) => {
	const navigate = useNavigate();

	const [form, setForm] = useState({
		files: [],
		comment: '',
	});

	const handleSubmit = (form, taskType) => {
		if (status === 'Брак') {
			setHistory(id, 'start', '');
		}
		setHistory(id, 'finish', form.comment);

		if (taskType === 'finish') {
			finishTask(form, id, timeStart, status === 'Брак' ? true : false, () => navigate('/'));
		} else if (taskType === 'changeDepartment') {
			// changeDepartment();
		}
	};

	return (
		<div className={styles.wrapper}>
			<header>
				<p>Отчёт по задаче</p>
				<img src={ImhExit} alt="" onClick={close} />
			</header>
			<div className={styles.form_wrapper}>
				<label>
					<p>Комментарий</p>
					<textarea
						type="text"
						className={styles.input_text}
						value={form.comment}
						onChange={(e) => setForm((prevState) => ({ ...prevState, comment: e.target.value }))}
					/>
				</label>
				<div className={styles.right_block}>
					<label className={styles.btn_file}>
						<input
							type="file"
							multiple
							onChange={(e) => setForm((prevState) => ({ ...prevState, files: e.target.files }))}
						/>
						<p className={`${styles.btn} ${styles.files_btn}`}>
							{form.files.length ? `Добавлено файлов ${form.files.length}` : 'Добавить файлы'}
						</p>
					</label>

					<button className={`${styles.btn} ${styles.sub_btn}`} onClick={() => handleSubmit(form, 'finish')}>
						Завершить и отправить отчёт
					</button>

					{/*<button*/}
					{/*	className={`${styles.btn} ${styles.sub_btn}`}*/}
					{/*	onClick={() => handleSubmit(form, 'changeDepartment')}>*/}
					{/*	Завершить и направить в другой отдел*/}
					{/*</button>*/}
				</div>
			</div>
		</div>
	);
};

export default TaskRaport;
