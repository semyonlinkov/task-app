import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import styles from './History.module.scss';

import { $singleTask } from '../../../store/selectedTask';
import Point from './Point/Point';
import Report from './Report/Report';

const History = () => {
	const task = useStore($singleTask);
	const [checkpoints, setCheckpoints] = useState([]);

	useEffect(() => {
		setCheckpoints([]);

		if (task) {
			setCheckpoints((prev) => [...prev, { title: 'Поставлена', status: true, date: task.date_create }]);
		}

		//* !== "0000-00-00 00:00:00"
		if (task.readed) {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: true, date: task.readed }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: false, date: task.readed }]);
		}

		if (task.title && task.timeStart !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: task.title, status: true, date: task.timeStart }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: task.title, status: 0, date: task.date_create }]);
		}

		if (task.status === 'В работе' || task.status === 'Выполнено') {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: true, date: task.date_create }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: false, date: task.date_create }]);
		}

		if (task.status == 'Выполнено') {
			setCheckpoints((prev) => [...prev, { title: 'Выполнена', status: true, date: task.timeEnd }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'Выполнена', status: false, date: task.timeEnd }]);
		}

		if (task.status == 'Брак') {
			setCheckpoints((prev) => [...prev, { title: 'Брак', status: true, date: task.deffect_time }]);
		}
	}, [task]);

	// console.log(checkpoints);
	// console.log(task);

	return (
		<div className={styles.wrapper}>
			<div className={styles.points_wrapper}>
				{checkpoints.map((point, i) => (
					<Point
						key={point.title + point.date}
						title={point.title}
						status={point.status}
						date={point.date}
						defect={point.defect}
						last={checkpoints.length - 1 === i}
					/>
				))}
			</div>
			{task.report_comment && <Report task={task} />}
		</div>
	);
};

export default History;
