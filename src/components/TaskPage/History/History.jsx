import { useStore } from 'effector-react';
import React, { useEffect, useState } from 'react';
import styles from './History.module.scss';

import { $singleTask } from '../../../store/selectedTask';
import Point from './Point/Point';
import Report from './Report/Report';
import HistoryItem from "./HistoryItem";

const History = () => {
	const task = useStore($singleTask);
	const [history2, setHistory2] = useState([]);


	useEffect(() => {
		if (task.historyJSON &&  JSON.parse(task.historyJSON)) {
			setHistory2(JSON.parse(task.historyJSON))
		}
	}, [task])

	return (

		<div className={styles.processTracker}>

			<HistoryItem title={'Поставлена'} active={[0, task.date_create]} />
			{Array.isArray(history2[0]) ? <>

				{history2.map(el2 => {
					return <div className={styles.deffect_block}>
						{el2.filter(el => el.type === 'view').length === 0 && <HistoryItem title={'Прочитана'} withLine={true} active={[]}/>}

						{el2.map(el => {
							let type = '';

							if (el.type === 'call') {
								type = 'Созвонился'
							} else if (el.type === 'start') {
								type = 'В работе'
							} else if (el.type === 'comment') {
								type = `Примечание от ${el.user.split(' ')[0]}`
							}  else if (el.type === 'finish') {
								type = 'Завершил работу'
							} else if (el.type === 'changeTech') {
								type = `Смена исполнителя`
							} else if (el.type === 'view') {
								type = `Прочитана`
							}

							if (el.type === 'view') {
								return <>
									<HistoryItem title={type} withLine={true} active={[0, el.date]} activeText={el.value}/>
									{el2.filter(el => el.type === 'call').length === 0 && <HistoryItem title={'Созвонился'} withLine={true} active={[]}/>}
								</>
							} else if (el.type !== 'deffect') {
								return <HistoryItem title={type} withLine={true} active={[0, el.date]} activeText={el.value}/>

							}

						})}

						{el2.filter(el => el.type === 'start').length === 0 && <HistoryItem title={'В работе'} withLine={true} active={[]}/>}
						{el2.filter(el => el.type === 'finish').length === 0 && <HistoryItem title={'Завершил работу'} withLine={true} active={[]}/>}
						{el2.filter(el => el.type === 'deffect').length === 1 && <HistoryItem title={'Брак'} withLine={true} active={[0, el2.filter(el => el.type === 'deffect')[0].date]} activeText={el2.filter(el => el.type === 'deffect')[0].value} failed={true}/>}
					</div>

				})}

			</> : <>

				{history2.filter(el => el.type === 'view').length === 0 && <HistoryItem title={'Прочитана'} withLine={true} active={[]}/>}
				{history2.length === 0 &&  <HistoryItem title={'Созвонился'} withLine={true} active={[]}/>}
				{history2.map(el => {
					let type = '';

					if (el.type === 'call') {
						type = 'Созвонился'
					} else if (el.type === 'start') {
						type = 'В работе'
					} else if (el.type === 'comment') {
						type = `Примечание от ${el.user.split(' ')[0]}`
					}  else if (el.type === 'finish') {
						type = 'Завершил работу'
					} else if (el.type === 'changeTech') {
						type = `Смена исполнителя`
					} else if (el.type === 'view') {
						type = `Прочитана`
					}
					if (type === 'Прочитана') {
						return <>
							<HistoryItem title={type} withLine={true} active={[0, el.date]} activeText={el.value}/>
							{history2.filter(el => el.type === 'call').length === 0 && <HistoryItem title={'Созвонился'} withLine={true} active={[]}/>}
						</>
					} else {
						return <HistoryItem title={type} withLine={true} active={[0, el.date]} activeText={el.value}/>

					}
				})}

				{history2.filter(el => el.type === 'start').length === 0 && <HistoryItem title={'В работе'} withLine={true} active={[]}/>}
				{history2.filter(el => el.type === 'finish').length === 0 && <HistoryItem title={'Завершил работу'} withLine={true} active={[]}/>}</>}

		</div>

	);
};

export default History;
