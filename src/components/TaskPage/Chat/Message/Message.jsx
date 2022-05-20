import React from 'react';
import readedMark from '../../../../img/readedCheck32.png';
import notReadedMark from '../../../../img/unreadedCheck32.png';
import styles from './Message.module.scss';

const Message = ({ readed, name, date, text }) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.name}>{name}</p>
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
