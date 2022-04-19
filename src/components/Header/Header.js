import styles from './Header.module.scss'
import BurgerMenu from "../BurgerMenu/BurgerMenu";
import { $showBurger } from '../../store/showBurgerState';
import { useStore } from 'effector-react';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { $toogleValue } from '../../store/taskToogleState';
import { useLocation } from 'react-router-dom';

const Header = () => {
	const showBurger = useStore($showBurger);
	const toggleValue = useStore($toogleValue);
	const { pathname } = useLocation();

	return (
		<div className={styles.wrapper}>
			{pathname === '/tasks'
				? <div className={styles.toggle_switch}>
					<ToggleSwitch />
					{toggleValue === 'gettedTasks' ? <p>Поставленные мне</p> : <p>Поставленные мной</p>}
				</div>
				: null
			}
			{showBurger && <BurgerMenu />}
		</div>
	)
}

export default Header
