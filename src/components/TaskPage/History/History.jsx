import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import styles from './History.module.scss';

import { $singleTask } from '../../../store/selectedTask';
import Point from './Point/Point';
import Report from './Report/Report';

const History = () => {
	const task = useStore($singleTask);
	const [checkpoints, setCheckpoints] = useState([]);

	// console.log(task);

	useEffect(() => {
		setCheckpoints([]);

		if (task.date_create && task.date_create !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: 'Поставлена', status: true, date: task.date_create }]);
		}

		//* !== "0000-00-00 00:00:00"
		if (task.readed && task.readed !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: true, date: task.readed }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: false, date: task.readed }]);
		}

		if (task.timeStart && task.timeStart !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: task.title, status: true, date: task.timeStart }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: task.title, status: 0, date: task.timeStart }]);
		}

		if (task.status === 'В работе' || task.status === 'Выполнено') {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: 'В работе', date: task.date_create }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: false, date: task.date_create }]);
		}

		if (task.status == 'Выполнено') {
			setCheckpoints((prev) => [...prev, { title: 'Выполнена', status: 'Выполнено', date: task.timeEnd }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'Выполнена', status: false, date: task.timeEnd }]);
		}

		if (task.status == 'Брак') {
			setCheckpoints((prev) => [...prev, { title: 'Брак', status: 'Брак', date: task.deffect_time }]);
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
			{task.report_comment && (
				<Report
					title={task.title}
					status={task.status}
					comment={task.report_comment}
					date={task.timeEnd}
					type={'report'}
				/>
			)}
			{task.deffect_comment && (
				<Report
					title={task.tilte}
					status={task.status}
					comment={task.deffect_comment}
					date={task.deffect_time}
					type={'deffect'}
				/>
			)}
		</div>
	);
};

export default History;
