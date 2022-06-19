import { useStore } from 'effector-react';
import styles from './History.module.scss';
import { VerticalTimeline, VerticalTimelineElement } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';

import { $singleTask } from '../../../store/selectedTask';
import Report from './Report/Report';
import moment from 'moment';

const History = () => {
	const task = useStore($singleTask);

	console.log(task);
	console.log(JSON.parse(task.historyJSON).flat());
	// console.log(JSON.parse(task.historyJSON));

	return (
		<div className={styles.wrapper}>
			<div className={styles.path}>
				{JSON.parse(task.historyJSON)
					.filter((arr) => Array.isArray(arr))
					.flat()
					.filter((el, i, arr) => !(el.type === 'view' && arr[i + 1].type === 'view')) //* Удаляем дубли view
					.map(({ type, date, value }) => {
						const setMarkColorAndTitle = () => {
							if (type === 'deffect') {
								return { title: 'Брак', color: 'Tomato' };
							} else if (type === 'finish') {
								return { title: 'Задача Завершена', color: 'LimeGreen' };
							} else if (type === 'chat') {
								return { title: 'Новое сообщение в чате', color: 'SkyBlue' };
							} else if (type === 'start') {
								return { title: 'Задача взята в работу', color: 'SkyBlue' };
							} else if (type === 'view') {
								return { title: 'Просмотрена', color: 'SkyBlue' };
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
										<p>{moment(date).format('DD.MM.YYYY HH:mm')}</p>
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
