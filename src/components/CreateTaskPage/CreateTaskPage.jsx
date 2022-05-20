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

const CreateTaskPage = () => {
	const navigate = useNavigate();
	const { register, handleSubmit, watch, setValue, getValues } = useForm();
	const [phone, setPhone] = useState('');

	const user = useStore($user);
	const workers = useStore($workerStatus);
	const customers = useStore($customers);

	const typeTask = ['Позвонить', 'Сделать договор', 'Другое'];

	const onSubmit = (data) => {
		createTask(data, user, () => navigate('/'), phone);
	};

	const files = getValues('files');

	const [allWorkers, setAllWorkers] = useState([]);
	const [searchBy, setSearchBy] = useState('none'); //* department/name/none

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
	// console.log(allObjects);
	// console.log('render');
	// console.log(isSameNumber);

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)} className={styles.wrapper}>
				<label>
					<p>Вид заявки</p>
					<TypeTaskSelect values={typeTask} setValue={(value) => setValue('type', value)} />
				</label>
				<label>
					<p>Название объекта</p>
					<ObjectNameSelect setValue={setValue} watch={watch} />
					{/* <input type="text" {...register('objectName')} /> */}
				</label>
				<label>
					<p>Адресс объекта</p>
					<ObjectAddressSelect setValue={setValue} watch={watch} />
					{/* <input type="text" {...register('objectAdress')} /> */}
				</label>
				<label>
					<p>Телефон клиента</p>
					<input
						onChange={(e) => {
							let phoneNumber = e.target.value;
							if (phoneNumber.length !== 12) {
								let formatPhone = phoneNumber.replace('+7', '8').replace(/[^\d]/g, '');

								let eleven = formatPhone.substring(0, 11);
								console.log(eleven);

								if (formatPhone.length - 1 < 11) {
									setPhone(formatPhone);
									if (eleven.length === 11) {
										setIsLoading(true);
										getCustomerByPhone(eleven);
										setShowObjectsPopUp(true);
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
						register={register}
						setValue={setValue}
						workers={workers}
						watch={watch}
						setSearchBy={(value) => setSearchBy(value)}
					/>
				)}
				{searchBy !== 'department' && (
					<WorkerSelect
						setValue={(value) => setValue('executor', value)}
						allWorkers={allWorkers}
						title={'Выбрать исполнителя по имени'}
						setSearchBy={(value) => setSearchBy(value)}
					/>
				)}
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
			{showObjectsPopUp && (
				<ChooseObjectPopUp
					customers={customers}
					setShowObjectsPopUp={() => setShowObjectsPopUp(false)}
					setValue={setValue}
				/>
			)}
		</>
	);
};

export default CreateTaskPage;
