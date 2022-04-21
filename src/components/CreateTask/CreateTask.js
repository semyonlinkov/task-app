import styles from './CreateTask.module.scss'
import { useForm } from "react-hook-form";
import { createTast } from '../../services-api/createTask';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $user } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { $workerStatus } from '../../store/workers';
import { setIsLoading } from '../../store/loadingState';

const employes = [
	{ title: 'Иванов Иван Иванович1', department: 'Бухгалтерия', id: 1 },
	{ title: 'Иванов Иван Иванович2', department: 'Бухгалтерия', id: 2 },
	{ title: 'Иванов Иван Иванович3', department: 'Бухгалтерия', id: 3 },
	{ title: 'Иванов Иван Иванович4', department: 'Кадры', id: 4 },
	{ title: 'Иванов Иван Иванович5', department: 'Кадры', id: 5 },
	{ title: 'Иванов Иван Иванович6', department: 'Кадры', id: 6 },
	{ title: 'Иванов Иван Иванович7', department: 'Склад', id: 8 },
	{ title: 'Иванов Иван Иванович8', department: 'Склад', id: 7 },
	{ title: 'Иванов Иван Иванович9', department: 'Склад', id: 9 },
]


const CreateTaskBlock = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, watch, formState, setValue } = useForm();
	const [department, setDepartment] = useState('');
	const [files, setFiles] = useState(0);
	const user = useStore($user);
	const workers = useStore($workerStatus);
	const onSubmit = data => createTast(data, user, () => navigate('/'));

	const typeTask = ['Позвонить', 'Сделать договор', 'Другое'];

	useEffect(() => {
		if (workers === 'loading') {
			setIsLoading(true)
		} else {
			setIsLoading(false)
		}
	}, [workers])

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form_wrapper}>
			<label>
				<p>Вид заявки</p>
				<select {...register('type')}>
					{typeTask.map(el => <option key={el} value={el}>{el}</option>)}
				</select>
			</label>
			<label>
				<p>Название объекта</p>
				<input {...register('objectName')} />
			</label>
			<label>
				<p>Адресс объекта</p>
				<input {...register('objectAdress')} />
			</label>
			<label>
				<p>Телефон клиента</p>
				<input {...register('clientPhoneNumber')} />
			</label>
			<label>
				<p>ФИО клиента</p>
				<input  {...register('fullname')} />
			</label>
			<label>
				<p>Отдел</p>
				<select {...register('department')} onChange={(e) => {
					setDepartment(e.target.value);
					if (workers === 'loading') {
						const person = Object.values(workers[department])[0];
						setValue('executor', `${person.ID}:${person.NAME}`);
					}
				}} >
					{workers !== 'loading'
						?
						Object.keys(workers).map(department => <option key={department} value={department}>{department}</option>)
						:
						null}
				</select >
			</label>
			<label>
				<p>Исполнитель</p>
				<select {...register('executor')}>
					{department
						?
						Object.values(workers[department]).map(person => <option key={person.ID} value={`${person.ID}:${person.NAME}`}>{person.NAME}</option>)
						:
						null}
				</select>
			</label>
			<label>
				<p>Соисполнитель</p>
				<select {...register('coexecutor')}>
					{department
						?
						Object.values(workers[department]).map(person => <option key={person.ID} value={`${person.ID}:${person.NAME}`}>{person.NAME}</option>)
						:
						null}
				</select>
			</label>
			<label>
				<p>Выбрать дату</p>
				<input className='datepicker' type="datetime-local" {...register('dateDeadline')} />
			</label>
			<label>
				<p>Комментарий</p>
				<textarea placeholder="Комментарий" {...register('comment')} />
			</label>
			<label className={styles.btn_file}>
				<input type="file" multiple {...register('files')} onChange={(e) => setFiles(e.target.files.length)} />
				<p>{files ? `Добавлено файлов ${files}` : 'Добавить файлы'}</p>
			</label>
			<input className={styles.btn_sub} type="submit" value="Создать заявку" onClick={() => console.log(watch("files"))} />
		</form >
	);
}

export default CreateTaskBlock
