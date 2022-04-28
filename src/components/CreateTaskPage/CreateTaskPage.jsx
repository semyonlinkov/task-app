import styles from './CreateTaskPage.module.scss';
import { useForm } from 'react-hook-form';
import { createTask } from '../../services-api/createTask';
import { useEffect } from 'react';
import { useStore } from 'effector-react';
import { $user } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { $workerStatus } from '../../store/workers';
import { setIsLoading } from '../../store/loadingState';

const CreateTaskPage = () => {
	const navigate = useNavigate();

	const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const user = useStore($user);
	const workers = useStore($workerStatus);

	const onSubmit = (data) => createTask(data, user, () => navigate('/'));
	const files = getValues('files');
	const typeTask = ['Позвонить', 'Сделать договор', 'Другое'];

	useEffect(() => {
		if (workers === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
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
				<input {...register('objectName')} />
			</label>
			<label>
				<p>Адресс объекта</p>
				<input {...register('objectAdress')} />
			</label>
			<label>
				<p>Телефон клиента</p>
				<input type="tel" pattern="[0-9]{3}-[0-9]{4}-[0-9]{4}" {...register('clientPhoneNumber')} />
			</label>
			<label>
				<p>ФИО клиента</p>
				<input {...register('fullname')} />
			</label>
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
				<p>Соисполнитель</p>
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
			<label style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0' }}>
				<p style={{ display: 'block' }}>Отправить СМС клиенту</p>
				<input
					style={{ display: 'block', alignSelf: 'center' }}
					type="checkbox"
					{...register('sendSMS')}
					onChange={(e) => setValue('sendSMS', e.target.value)}
				/>
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
