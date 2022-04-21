import { useStore } from 'effector-react';
import React from 'react';
import { $isLoading } from '../../store/loadingState';

import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = () => {
	const loading = useStore($isLoading);
	
	return (
		loading && (
			<div className={styles.spinner_wrapper}>
				<div className={styles['lds-ring']}>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>
		)
	);
};

export default LoadingSpinner;
