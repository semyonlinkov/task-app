import { useStore } from 'effector-react';
import styles from './History.module.scss';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { $singleTask } from '../../../store/selectedTask';
import Report from './Report/Report';
import moment from 'moment';
import { useState } from 'react';
import { useEffect } from 'react';

const History = () => {
	const task = useStore($singleTask);
	const [historyArr, setHistoryArr] = useState([]);

	useEffect(() => {
		const history = [];

		if (task?.readed && task?.readed !== '0000-00-00 00:00:00') {
			// history.push({ type: 'view', date: task.readed });
		} else {
			history.push({ type: 'view', date: '' });
		}

		if (task?.timeStart && task?.timeStart !== '0000-00-00 00:00:00') {
			// history.push({ type: 'start', date: task.timeStart });
		} else {
			history.push({ type: 'start', date: '' });
		}

		if (task?.historyJSON) {
			history.push(JSON.parse(task.historyJSON).flat());
		}

		if (task?.timeEnd && task?.timeEnd !== '0000-00-00 00:00:00') {
			// history.push({ type: 'finish', date: task.timeEnd });
		} else {
			history.push({ type: 'finish', date: '' });
		}

		if (task.historyJSON) {
			setHistoryArr((prev) => {
				return history;
			});
		} else {
			setHistoryArr(history);
		}
	}, []);

	// console.log(historyArr);

	// console.log(task);
	// console.log(historyArr);

	// console.log(JSON.parse(task.historyJSON).flat());
	// console.log(JSON.parse(task.historyJSON));

	return (
		<div className={styles.wrapper}>
			<div className={styles.path}>
				{historyArr
					.filter((elArr, _, arr) => Array.isArray(elArr) || Array.isArray(arr))
					.flat()
					.filter((el, i, arr) => !(el?.type === 'view' && arr[i + 1]?.type === 'view')) //* Удаляем дубли view
					.map(({ type, date, value }) => {
						const setMarkColorAndTitle = () => {
							if (type === 'deffect') {
								return { title: 'Брак', color: 'Tomato' };
							} else if (type === 'finish') {
								if (date) {
									return { title: 'Задача Завершена', color: 'LimeGreen' };
								} else {
									return { title: 'Задача Завершена', color: 'gray' };
								}
							} else if (type === 'chat') {
								return { title: 'Новое сообщение в чате', color: 'SkyBlue' };
							} else if (type === 'start') {
								if (date) {
									return { title: 'Задача взята в работу', color: 'SkyBlue' };
								} else {
									return { title: 'Задача взята в работу', color: 'gray' };
								}
							} else if (type === 'view') {
								if (date) {
									return { title: 'Просмотрена', color: 'SkyBlue' };
								} else {
									return { title: 'Просмотрена', color: 'gray' };
								}
							} else if (type === 'comment') {
								return { title: 'Добавлено примечание', color: 'SkyBlue' };
							} else if (type === 'change') {
								return { title: 'Передача задачи', color: 'SkyBlue' };
							} else {
								return { title: null, color: 'SkyBlue' };
							}
						};

						return (
							<VerticalTimeline lineColor="#aaaaaa" className={styles.timeline_root} layout={'1-column-left'}>
								<VerticalTimelineElement
									className="vertical-timeline-element--work"
									contentStyle={{
										padding: '5px 15px 0 15px',
										marginLeft: '50px',
										background: '#e3e3e3',
										color: 'black',
									}}
									dateClassName={styles.timeline_date}
									contentArrowStyle={{ borderRight: '7px solid  #e3e3e3' }}
									iconStyle={{
										background: setMarkColorAndTitle().color,
										color: '#fff',
										marginLeft: '10px',
										marginTop: '10px',
										width: '20px',
										height: '20px',
									}}
									// icon={<WorkIcon />}
								>
									<div className={styles.timeline_info}>
										<p>{setMarkColorAndTitle().title}</p>
										{date ? <p>{moment(date).format('DD.MM.YYYY HH:mm')}</p> : null}
									</div>
									<p style={{ fontWeight: 400 }}>{value}</p>
								</VerticalTimelineElement>
							</VerticalTimeline>
						);
					})}
			</div>
			<div className={styles.raport}>
				{task.timeEnd !== '0000-00-00 00:00:00' || task.deffect_completed !== '0000-00-00 00:00:00' ? (
					<Report
						filesArr={task.report_files ? task.report_files.split(';') : false}
						date={task.timeEnd !== '0000-00-00 00:00:00' ? task.timeEnd : task.deffect_completed}
						task={task}
					/>
				) : null}
			</div>
		</div>
	);
};

export default History;
