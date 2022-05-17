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

		if (task.date_create && task.date_create !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: 'Поставлена', status: true, date: task.date_create }]);
		}

		if (task.readed && task.readed !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: true, date: task.readed }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'Прочитана', status: false, date: task.readed }]);
		}

		if (task.timeStart && task.timeStart !== '0000-00-00 00:00:00') {
			setCheckpoints((prev) => [...prev, { title: task.title, status: true, date: task.timeStart }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: task.title, status: false, date: task.timeStart }]);
		}

		if (task.status === 'В работе' || task.status === 'Выполнено') {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: true, date: task.timeStart }]);
		} else {
			setCheckpoints((prev) => [...prev, { title: 'В работе', status: false, date: task.timeStart }]);
		}

		if (task.status == 'Выполнено') {
			setCheckpoints((prev) => [
				...prev,
				{
					title: 'Выполнена',
					status: true,
					date: task.timeEnd !== '0000-00-00 00:00:00' ? task.timeEnd : task.deffect_completed,
				},
			]);
		} else {
			setCheckpoints((prev) => [
				...prev,
				{
					title: 'Выполнена',
					status: false,
					date: task.timeEnd !== '0000-00-00 00:00:00' ? task.timeEnd : task.deffect_completed,
				},
			]);
		}

		if (task.status === 'Брак' || task.deffect_time !== '0000-00-00 00:00:00') {
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
			{task.timeEnd !== '0000-00-00 00:00:00' ||
				(task.deffect_completed !== '0000-00-00 00:00:00' && (
					<Report
						id={task.id}
						title={task.title}
						status={task.status}
						comment={task.report_comment}
						filesArr={task.report_files ? task.report_files.split(';') : false}
						date={task.timeEnd !== '0000-00-00 00:00:00' ? task.timeEnd : task.deffect_completed}
					/>
				))}
		</div>
	);
};

export default History;
