import styles from './Header.module.scss';
import { useStore } from 'effector-react';
import ToggleSwitch from './ToggleSwitch/ToggleSwitch';
import { $toggleValue } from '../../store/taskToggleState';
import { useLocation, useNavigate } from 'react-router-dom';
import AddImg from '../../img/add64.png';
import CloseImg from '../../img/closeRed64.png';
import { $singleTask } from '../../store/selectedTask';

const Header = () => {
	const toggleValue = useStore($toggleValue);
	const task = useStore($singleTask);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.task_img}
				type="image"
				src={pathname === '/' ? AddImg : CloseImg}
				onClick={() => (pathname === '/' ? navigate('/create_task') : navigate('/'))}
			/>
			{pathname === '/create_task' && <p className={styles.title_weight}>Создать задачу</p>}
			{pathname.includes('tasks') && <p className={styles.title_weight}>Задача: {task?.title}</p>}
			{pathname === '/' && (
				<div className={styles.toggle_switch}>
					<ToggleSwitch />
					<p className={styles.title_weight}>
						{toggleValue === 'gettedTasks' ? 'Задачи поставленные мне' : 'Задачи поставленные мной'}
					</p>
				</div>
			)}
		</div>
	);
};

export default Header;
