import { useStore } from 'effector-react';
import React from 'react';
import styles from './History.module.scss';

import { $singleTask } from '../../../store/selectedTask';
import Point from './Point/Point';

const checkpoints = [
	{ title: 'Задача начата', status: 1, time: '27.04.2022 07:05:46' },
	{ title: 'Прочитана', status: 1, time: '27.04.2022 07:05:46' },
	{ title: 'Позвонил клиенту', status: 1, time: '27.04.2022 07:05:46' },
	{ title: 'В работе', status: 0, time: '27.04.2022 07:05:46' },
	{ title: 'Выполнено', status: 0, time: '27.04.2022 07:05:46' },
];

const History = () => {
	const task = useStore($singleTask);

	return (
		<div className={styles.wrapper}>
			{checkpoints.map((point, i) => (
				<Point title={point.title} status={point.status} time={point.time} last={checkpoints.length - 1 === i} />
			))}
		</div>
	);
};

export default History;
