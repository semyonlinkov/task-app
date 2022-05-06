import styles from './Header.module.scss';
import { useStore } from 'effector-react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { $toggleValue } from '../../store/taskToggleState';
import { useLocation, useNavigate } from 'react-router-dom';
import create from '../../img/create-task-3.png';
import cross from '../../img/cross-2.png';

const Header = () => {
	const toggleValue = useStore($toggleValue);
	const { pathname } = useLocation();
	const navigate = useNavigate();

	return (
		<div className={styles.wrapper}>
			<input
				className={styles.task_img}
				type="image"
				src={pathname === '/' ? create : cross}
				onClick={() => (pathname === '/' ? navigate('/create_task') : navigate('/'))}
			/>
			{pathname === '/create_task' && <p>Создать задачу</p>}
			{pathname.includes('tasks') && <p>Задача: {pathname.split('/').at(-1)}</p>}
			{pathname === '/' && (
				<div className={styles.toggle_switch}>
					<ToggleSwitch />
					<p className={styles.switch_title}>
						{toggleValue === 'gettedTasks' ? 'Задачи поставленные мне' : 'Задачи поставленные мной'}
					</p>
				</div>
			)}
		</div>
	);
};

export default Header;
