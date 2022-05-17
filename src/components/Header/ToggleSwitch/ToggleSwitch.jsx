import React from 'react';
import { useStore } from 'effector-react';
import { $toggleValue, setToggle } from '../../../store/taskToggleState';
import styles from './ToggleSwitch.module.scss';

const ToggleSwitch = () => {
	const toggleValue = useStore($toggleValue);

	return (
		<div className={styles['toggle-switch']}>
			<input
				onChange={() => {}}
				type="checkbox"
				className={styles['toggle-switch-checkbox']}
				checked={toggleValue === 'takenTasks'}
			/>
			<label
				className={styles['toggle-switch-label']}
				onClick={() => {
					setToggle();
				}}>
				<span className={styles['toggle-switch-inner']} />
				<span className={styles['toggle-switch-switch']} />
			</label>
		</div>
	);
};

export default ToggleSwitch;
