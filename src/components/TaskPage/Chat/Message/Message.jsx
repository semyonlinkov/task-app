import React from 'react';
import readedMark from '../../../../img/readedCheck32.png';
import notReadedMark from '../../../../img/unreadedCheck32.png';
import styles from './Message.module.scss';

const Message = ({ readed, name, date, text }) => {
	const shortName = () => {
		const arrName = name.split(' ');
		return arrName.length < 3 ? `${arrName[0]} ${arrName[1]}` : `${arrName[0]} ${arrName[1][0]}.${arrName[2][0]}`;
	};

	return (
		<div className={styles.wrapper}>
			<p className={styles.name}>{shortName(name)}</p>
			<p>{text}</p>
			<p className={styles.date}>{date}</p>
			<div className={styles.readed_mark}>
				{readed === '0' ? (
					<img src={notReadedMark} alt="not-readed-mark" />
				) : (
					<img src={readedMark} alt="readed-mark" />
				)}
			</div>
		</div>
	);
};

export default Message;
