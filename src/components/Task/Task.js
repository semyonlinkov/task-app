import React, { useLayoutEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { tasks } from '../../fakeData/data';
import { setShowBurger } from '../../store/showBurgerState';

import styles from './Task.module.scss';
import arrow from '../../img/arrow.png';

const Task = () => {
	const navigate = useNavigate();
	const { id } = useParams();

	useLayoutEffect(() => {
		setShowBurger(false);
		return () => {
			setShowBurger(true);
		}
	}, []);

	return (
		<div>
			<input className={styles['arrow-back']} type="image" src={arrow} onClick={() => navigate('/')} />
			<pre>
				{JSON.stringify(tasks.find(task => task.id == id), null, 2)}
			</pre >
			<p>Статус</p>
			<p>Новая</p>
			<p>Ответственный</p>
			<p>Киселёв К.В</p>
			<p>Исполнитель</p>
			<p>Киселёв К.В</p>
			<p>Название объекта</p>
			<p>Адрес объекта</p>
			<p>Описание</p>
			<p>Упал провод ПС с потолка.СРОЧНО! с.Солянка, ул.Луговая, д.12а</p >
			<p>Клиент</p>
			<p>89275600039 - ИП Сафиулаева Гадиля Искандеровна</p>
			<p>Время на работу</p>
		</div >
	)
}

export default Task