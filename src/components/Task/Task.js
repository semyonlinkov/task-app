import React, {useLayoutEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { setShowBurger } from '../../store/showBurgerState';

import styles from './Task.module.scss';
import {setSingleTask} from "../../store/selectedTask";
import {$showSingleTask} from "../../store/tasks";
import {useStore} from "effector-react";
import Back from '../../img/left-arrow.png'
import Info from '../../img/icons8-info-50.png'
import Files from '../../img/icons8-cloud-file-40.png'
import History from '../../img/icons8-time-machine-40.png'
import Chat from '../../img/icons8-chat-40.png'
import MainData from "./MainData";



const Task = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	const task = useStore($showSingleTask);


	const [nav, setNav] = useState('info')

	useLayoutEffect(() => {
		setShowBurger(false);
		setSingleTask(id)
		return () => {
			setShowBurger(true);
			setSingleTask(0)
		}
	}, []);


	return (
		<div style={{position: 'relative'}}>
			<div className={styles.top_blocks}>
				<header className={styles.header}>
					<img src={Back} alt="" className={styles.arrow_back} onClick={() => navigate('/')}/>
				</header>
				<ul className={styles.nav}>
					<li onClick={() => setNav('info')} className={nav === 'info' ? styles.active : null}>
						<img src={Info} alt=""/>
					</li>
					<li onClick={() => setNav('files')} className={nav === 'files' ? styles.active : null}>
						<img src={Files} alt=""/>
					</li>
					<li onClick={() => setNav('history')} className={nav === 'history' ? styles.active : null}>
						<img src={History} alt=""/>
					</li>
					<li onClick={() => setNav('chat')} className={nav === 'chat' ? styles.active : null}>
						<img src={Chat} alt=""/>
					</li>
				</ul>
			</div>
			<div className={styles.body}>
				{nav === 'info' ? <MainData task={task}/> : null}
			</div>
			<div>
				<ul className={styles.bottom_menu}>
					<li onClick={() => setNav('info')} className={nav === 'info' ? styles.active : null}>
						<img src={Info} alt=""/>
					</li>
					<li onClick={() => setNav('files')} className={nav === 'files' ? styles.active : null}>
						<img src={Files} alt=""/>
					</li>
					<li onClick={() => setNav('history')} className={nav === 'history' ? styles.active : null}>
						<img src={History} alt=""/>
					</li>

				</ul>
			</div>
		</div >
	)
}

export default Task