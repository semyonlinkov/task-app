import React from 'react';
import readedMark from '../../../../img/readed-mark.png';
import notReadedMark from '../../../../img/not-readed-mark.png';
import styles from './Message.module.scss';

const Message = ({ readed, name, date, text }) => {
	return (
		<div className={styles.wrapper}>
			<p className={styles.name}>{name}</p>
			<p>
				{text || `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi iste perferendis labore nemo rerum earum,
				dolores voluptatum tempore voluptates fuga cupiditate reprehenderit delectus dignissimos eligendi. Lorem
				ipsum dolor sit amet consectetur adipisicing elit. Sequi iste perferendis labore nemo rerum earum, dolores
				voluptatum tempore voluptates fuga cupiditate reprehenderit delectus dignissimos eligendi.`}
			</p>
			<p className={styles.date}>{date}</p>
			<div className={styles.readed_mark}>
				{readed ? <img src={readedMark} alt="readed-mark" /> : <img src={notReadedMark} alt="not-readed-mark" />}
			</div>
		</div>
	);
};

export default Message;
