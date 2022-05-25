import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import styles from './History.module.scss';

import { $singleTask } from '../../../store/selectedTask';
import HistoryItem from './HistoryItem';
import Report from './Report/Report';

const History = () => {
	const task = useStore($singleTask);
	const [history2, setHistory2] = useState([]);

	useEffect(() => {
		if (task.historyJSON && JSON.parse(task.historyJSON)) {
			setHistory2(JSON.parse(task.historyJSON));
		}
	}, [task]);

	// console.log(task);

	return (
		<div className={styles.wrapper}>
			<div className={styles.path}>
				<HistoryItem title={'Поставлена'} active={[0, task.date_create]} />
				{Array.isArray(history2[0]) ? (
					<>
						{history2.map((el2) => {
							return (
								<div className={styles.deffect_block}>
									{el2.filter((el) => el.type === 'view').length === 0 && (
										<HistoryItem title={'Прочитана'} withLine={true} active={[]} />
									)}

									{el2.map((el) => {
										let type = '';

										if (el.type === 'call') {
											type = 'Созвонился';
										} else if (el.type === 'start') {
											type = 'В работе';
										} else if (el.type === 'comment') {
											type = `Примечание от ${el.user.split(' ')[0]}`;
										} else if (el.type === 'finish') {
											type = 'Завершил работу';
										} else if (el.type === 'changeTech') {
											type = `Смена исполнителя`;
										} else if (el.type === 'view') {
											type = `Прочитана`;
										}

										if (el.type !== 'deffect') {
											return (
												<HistoryItem
													title={type}
													withLine={true}
													active={[0, el.date]}
													activeText={el.value}
												/>
											);
										}
									})}

									{el2.filter((el) => el.type === 'start').length === 0 && (
										<HistoryItem title={'В работе'} withLine={true} active={[]} />
									)}
									{el2.filter((el) => el.type === 'finish').length === 0 && (
										<HistoryItem title={'Завершил работу'} withLine={true} active={[]} />
									)}
									{el2.filter((el) => el.type === 'deffect').length === 1 && (
										<HistoryItem
											title={'Брак'}
											withLine={true}
											active={[0, el2.filter((el) => el.type === 'deffect')[0].date]}
											activeText={el2.filter((el) => el.type === 'deffect')[0].value}
											failed={true}
										/>
									)}
								</div>
							);
						})}
					</>
				) : (
					<>
						{history2.filter((el) => el.type === 'view').length === 0 && (
							<HistoryItem title={'Прочитана'} withLine={true} active={[]} />
						)}
						{history2.length === 0 && <HistoryItem title={'Созвонился'} withLine={true} active={[]} />}
						{history2.map((el) => {
							let type = '';

							if (el.type === 'call') {
								type = 'Созвонился';
							} else if (el.type === 'start') {
								type = 'В работе';
							} else if (el.type === 'comment') {
								type = `Примечание от ${el.user.split(' ')[0]}`;
							} else if (el.type === 'finish') {
								type = 'Завершил работу';
							} else if (el.type === 'changeTech') {
								type = `Смена исполнителя`;
							} else if (el.type === 'view') {
								type = `Прочитана`;
							}
							// console.log(el);
							return <HistoryItem title={type} withLine={true} active={[0, el.date]} activeText={el.value} />;
						})}

						{history2.filter((el) => el.type === 'start').length === 0 && (
							<HistoryItem title={'В работе'} withLine={true} active={[]} />
						)}
						{history2.filter((el) => el.type === 'finish').length === 0 && (
							<HistoryItem title={'Завершил работу'} withLine={true} active={[]} />
						)}
					</>
				)}
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
