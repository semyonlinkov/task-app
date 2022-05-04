import styles from './CreateTaskPage.module.scss';
import { useForm } from 'react-hook-form';
import { createTask } from '../../services-api/createTask';
import { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { $user } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { $workerStatus } from '../../store/workers';
import { setIsLoading } from '../../store/loadingState';
import InputMask from 'react-input-mask';

const CreateTaskPage = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const [tel, setTel] = useState('');

	const user = useStore($user);
	const workers = useStore($workerStatus);

	const typeTask = ['Позвонить', 'Сделать договор', 'Другое'];

	const [checkbox, setCheckBox] = useState(false);
	const onSubmit = (data) => createTask(data, user, () => navigate('/'), tel);

	const files = getValues('files');

	const [allWorkers, setAllWorkers] = useState([]);
	const [searchedWorkers, setSearchedWorkers] = useState([]);
	const [searchedWorker, setSearchedWorker] = useState('');

	const [chooseSearchType, setChooseSearchType] = useState();

	const allWorkersHandler = () => {
		let array = [];
		Object.values(workers).forEach((arr) => {
			array = [...array, ...arr];
		});
		return array;
	};

	const searchHandler = (str) => {
		if (str) {
			setSearchedWorkers([...allWorkers].filter((worker) => worker.NAME.toLowerCase().includes(str.toLowerCase())));
		} else {
			setSearchedWorkers([]);
		}
	};

	useEffect(() => {
		if (workers === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
			setAllWorkers(allWorkersHandler());
		}
	}, [workers]);

console.log(watch());


	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
			<label>
				<p>Вид заявки</p>
				<select {...register('type')}>
					{typeTask.map((el) => (
						<option key={el} value={el}>
							{el}
						</option>
					))}
				</select>
			</label>
			<label>
				<p>Название объекта</p>
				<input type="text" {...register('objectName')} />
			</label>
			<label>
				<p>Адресс объекта</p>
				<input type="text" {...register('objectAdress')} />
			</label>
			<label>
				<p>Телефон клиента</p>
				<InputMask mask="+7\ 999 999-99-99" maskChar={''} value={tel} onChange={(e) => setTel(e.target.value)}>
					{(inputProps) => <input {...inputProps} type="tel" disableunderline="true" />}
				</InputMask>
			</label>
			<label>
				<p>ФИО клиента</p>
				<input type="text" {...register('fullname')} />
			</label>
			<label>
				<p>Выбрать исполнителя по имени</p>
				<input
					type="text"
					onChange={(e) => {
						searchHandler(e.target.value);
						setSearchedWorker(e.target.value);
					}}
					value={searchedWorker}
				/>
				{searchedWorkers && (
					<ul className={styles.select_dropdown}>
						{[...searchedWorkers].map((person) => (
							<li
								key={person.ID}
								onClick={() => {
									setValue('executor', `${person.ID}:${person.NAME}`);
									setSearchedWorker(person.NAME);
									setSearchedWorkers([]);
								}}>
								{person.NAME} | {person.DEPARTAMENT}
							</li>
						))}
					</ul>
				)}
			</label>
			{/* <label>
				<p>Выбрать наблюдателя по имени</p>
				<input
					type="text"
					onChange={(e) => {
						searchHandler(e.target.value);
						setSearchedWorker(e.target.value);
					}}
					value={searchedWorker}
				/>
				{searchedWorkers && (
					<ul className={styles.select_dropdown}>
						{[...searchedWorkers].map((person) => (
							<li
								key={person.ID}
								onClick={() => {
									setValue('coexecutor', `${person.ID}:${person.NAME}`);
									setSearchedWorker(person.NAME);
									setSearchedWorkers([]);
								}}>
								{person.NAME} | {person.DEPARTAMENT}
							</li>
						))}
					</ul>
				)}
			</label> */}
			<label>
				<p>Отдел</p>
				<select
					{...register('department')}
					onChange={(e) => {
						setValue('department', e.target.value);
						setValue('executor', `${workers[e.target.value][0].ID}:${workers[e.target.value][0].NAME}`);
						setValue('coexecutor', `${workers[e.target.value][0].ID}:${workers[e.target.value][0].NAME}`);
					}}>
					{workers !== 'loading'
						? Object.keys(workers).map((department) => (
								<option key={department} value={department}>
									{department}
								</option>
						  ))
						: null}
				</select>
			</label>
			<label>
				<p>Исполнитель</p>
				<select {...register('executor')}>
					{watch().department
						? Object.values(workers[watch().department]).map((person) => (
								<option key={person.ID} value={`${person.ID}:${person.NAME}`}>
									{person.NAME}
								</option>
						  ))
						: null}
				</select>
			</label>
			<label>
				<p>Наблюдатель</p>
				<select {...register('coexecutor')}>
					{watch().department
						? Object.values(workers[watch().department]).map((person) => (
								<option key={person.ID} value={`${person.ID}:${person.NAME}`}>
									{person.NAME}
								</option>
						  ))
						: null}
				</select>
			</label>
			<label>
				<p>Выбрать дату</p>
				<input className="datepicker" type="datetime-local" {...register('dateDeadline')} />
			</label>
			<label>
				<p>Комментарий</p>
				<textarea placeholder="Введите свой комментарий" {...register('comment')} />
			</label>
			<label className={styles.btn_file}>
				<input type="file" multiple {...register('files')} />
				<p>{files?.length ? `Добавлено файлов ${files.length}` : 'Добавить файлы'}</p>
			</label>
			<label>
				<input
					className={styles.btn_sub}
					type="submit"
					value="Создать заявку"
					onClick={() => console.log(watch('files'))}
				/>
			</label>
		</form>
	);
};

export default CreateTaskPage;
