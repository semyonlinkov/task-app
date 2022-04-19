import { useStore } from 'effector-react';
import React from 'react';
import { $toogleValue, setToogle } from '../../store/taskToogleState';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = () => {
	const toogleValue = useStore($toogleValue);

	return (
		<div className={styles['toggle-switch']}>
			<input
				onChange={() => {}}
				type="checkbox"
				className={styles['toggle-switch-checkbox']}
				checked={toogleValue === 'takenTasks'}
			/>
			<label
				className={styles['toggle-switch-label']}
				onClick={() => {
					setToogle();
				}}>
				<span className={styles['toggle-switch-inner']} />
				<span className={styles['toggle-switch-switch']} />
			</label>
		</div>
	);
};

export default ToggleSwitch;
