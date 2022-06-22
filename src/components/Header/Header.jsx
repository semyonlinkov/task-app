import styles from './Header.module.scss';
import { useStore } from 'effector-react';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import { $toggleValue } from '../../store/taskToggleState';
import { useLocation, useNavigate } from 'react-router-dom';
import AddImg from '../../img/add64.png';
import CloseImg from '../../img/closeRed64.png';
import { $singleTask } from '../../store/selectedTask';
import { $searchTasks, setTasksSearch } from '../../store/tasks';

const Header = () => {
	const toggleValue = useStore($toggleValue);
	const task = useStore($singleTask);
	const searchTasks = useStore($searchTasks);

	const { pathname } = useLocation();
	const navigate = useNavigate();

	// console.log(searchTasks);

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.task_img}
				type="image"
				src={pathname === '/' || pathname.indexOf('index.html') !== -1 ? AddImg : CloseImg}
				onClick={() =>
					pathname === '/' || pathname.indexOf('index.html') !== -1 ? navigate('/create_task') : navigate('/')
				}
			/>
			{pathname === '/create_task' && <p className={styles.title_weight}>Создать задачу</p>}
			{pathname.includes('tasks') && <p className={styles.title_weight}>Задача: {task?.title}</p>}
			{pathname === '/' || pathname.indexOf('index.html') !== -1 ? (
				<div className={styles.toggle_switch}>
					<ToggleSwitch />
					<p className={styles.title_weight}>{toggleValue === 'gettedTasks' ? 'Мне' : 'Мои'}</p>
					<input
						value={searchTasks}
						type="text"
						placeholder="Поиск по задачам.."
						onChange={(e) => {
							setTasksSearch(e.target.value);
						}}
					/>
					<button
						onClick={() => {
							setTasksSearch('');
						}}>
						x
					</button>
				</div>
			) : null}
		</div>
	);
};

export default Header;
