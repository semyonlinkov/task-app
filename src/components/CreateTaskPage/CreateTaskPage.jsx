import styles from './CreateTaskPage.module.scss';
import { useForm } from 'react-hook-form';
import { createTask } from '../../services-api/createTask';
import { useEffect, useMemo, useState } from 'react';
import { useStore } from 'effector-react';
import { $user } from '../../store/user';
import { useNavigate } from 'react-router-dom';
import { $workerStatus } from '../../store/workers';
import { setIsLoading } from '../../store/loadingState';
import WorkerSelect from './WorkerSelect/WorkerSelect';
import ChooseByDepartmentBlock from './ChooseByDepartmentBlock/ChooseByDepartmentBlock';
import { $customers, getCustomerByPhone } from '../../store/getCusomer';
import ChooseObjectPopUp from './ChooseObjectPopUp/ChooseObjectPopUp';
import TypeTaskSelect from './TaskTypeSelect/TaskTypeSelect';
import { getAllObjects } from '../../store/getAllObjects';
import ObjectNameSelect from './ObjectNameSelect/ObjectNameSelect';
import ObjectAddressSelect from './ObjectAddressSelect/ObjectAddressSelect';
import { createTechTask } from '../../services-api/createTechTask';

const CreateTaskPage = () => {
	const typeTaskValues = [
		{ taskType: 'Другое', departments: ['Все'] }, //! Не изменять захаркодено!
		{ taskType: 'Позвонить', departments: ['Все'] }, //! Не изменять захаркодено!
		// { taskType: 'Замена ключей', departments: ['Технический'] },
		{ taskType: 'Сделать MyAlarm', departments: ['Инженерный'] },
		{ taskType: 'Сделать договор', departments: ['Маркетинг'] },
		{ taskType: 'Клиент запрашивает стоимость услуг', departments: ['Маркетинг'] },
		{ taskType: 'Приостановить/Возобновить договор на охрану', departments: ['Маркетинг'] },
		{ taskType: 'Расторжение договора', departments: ['Маркетинг'] },
		{ taskType: 'Клиент запрашивает стоимость физ охраны', departments: ['Физ охрана'] },
		{ taskType: 'Клиент запрашивает возможность сопровождения', departments: ['Физ охрана'] },
	];

	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const [phone, setPhone] = useState('');

	const user = useStore($user);
	const workers = useStore($workerStatus);
	const customers = useStore($customers);

	const onSubmit = (data) => {
		if (getValues().department === 'Технический') {
			createTechTask(data, user, () => navigate('/'), phone);
		} else {
			createTask(data, user, () => navigate('/'), phone);
		}
	};

	const files = getValues('files');

	const [allWorkers, setAllWorkers] = useState([]);
	const [searchBy, setSearchBy] = useState('none'); //* department/name/none
	const [whosePhoneName, setWhosePhoneName] = useState('Телефон хоз-органа');

	const [showObjectsPopUp, setShowObjectsPopUp] = useState(false);

	const allWorkersHandler = useMemo(() => {
		let array = [];
		Object.values(workers).forEach((arr) => (array = [...array, ...arr]));
		return array;
	}, [workers]);

	useEffect(() => {
		getAllObjects();
	}, []);

	useEffect(() => {
		if (workers === 'loading') {
			setIsLoading(true);
		} else {
			setIsLoading(false);
			setAllWorkers(allWorkersHandler);
		}
	}, [workers, allWorkersHandler]);

	// console.log(customers);
	// console.log(phone);
	// console.log(watch());
	// console.log(getValues());
	// console.log('render');
	// console.log(workers);
	// console.log(user);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
				<label>
					<p>Вид заявки</p>
					<TypeTaskSelect
						setValue={setValue}
						workers={workers}
						watch={watch}
						typeTaskValues={typeTaskValues}
						getValues={getValues}
					/>
				</label>
				<label>
					<p>Название объекта</p>
					<ObjectNameSelect setValue={setValue} getValues={getValues} />
					{/* <input type="text" {...register('objectName')} /> */}
				</label>
				<label>
					<p>Адресс объекта</p>
					<ObjectAddressSelect setValue={setValue} getValues={getValues} />
					{/* <input type="text" {...register('objectAdress')} /> */}
				</label>
				<label>
					<p>{whosePhoneName}</p>
					<input
						onChange={(e) => {
							let phoneNumber = e.target.value;
							if (phoneNumber.length !== 12) {
								let formatPhone = phoneNumber.replace('+7', '8').replace(/[^\d]/g, '');

								let eleven = formatPhone.substring(0, 11);

								if (formatPhone.length - 1 < 11) {
									setPhone(formatPhone);
									if (eleven.length === 11) {
										setIsLoading(true);
										getCustomerByPhone({ phone: eleven, setShowObjectsPopUp, setIsLoading });
									}
								}
							}
						}}
						value={phone}></input>
				</label>
				<label>
					<p>ФИО клиента</p>
					<input type="text" {...register('fullname')} />
				</label>

				{searchBy !== 'name' && (
					<ChooseByDepartmentBlock
						typeTaskValues={typeTaskValues}
						register={register}
						setValue={setValue}
						getValues={getValues}
						workers={workers}
						setSearchBy={(value) => setSearchBy(value)}
					/>
				)}
				{searchBy !== 'department' && (
					<WorkerSelect
						setValue={setValue}
						allWorkers={allWorkers}
						title={'Выбрать исполнителя по имени'}
						setSearchBy={(value) => setSearchBy(value)}
					/>
				)}
				<label>
					<p>Выбрать срок исполнения</p>
					<input className="datepicker" type="datetime-local" {...register('dateDeadline')} />
				</label>
				<label className={styles.checkbox}>
					<input type="checkbox" {...register('banChangeExecutor')} />
					<p>Запретить передавать задачу</p>
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
						// onClick={() => console.log(watch('files'))}
					/>
				</label>
			</form>
			{showObjectsPopUp && (
				<ChooseObjectPopUp
					customers={customers}
					setShowObjectsPopUp={() => setShowObjectsPopUp(false)}
					setValue={setValue}
					setWhosePhoneName={() => setWhosePhoneName('Телефон клиента')}
				/>
			)}
		</>
	);
};

export default CreateTaskPage;
