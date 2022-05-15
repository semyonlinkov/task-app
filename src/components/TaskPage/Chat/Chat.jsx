import React, { useEffect, useRef, useState } from 'react';
import { $singleTask } from '../../../store/selectedTask';
import { $user } from '../../../store/user';
import styles from './Chat.module.scss';
import Message from './Message/Message';
import Send from '../../../img/send-message.png';
import Avatar from './Avatar/Avatar';
import { useStore } from 'effector-react';
import { getAllMessages } from '../../../services-api/getAllMessages';
import { sendMessage } from '../../../services-api/sendMessage';
import { setCommentsViewed } from '../../../services-api/setCommentsViewed';

const Chat = () => {
	const task = useStore($singleTask);
	const user = useStore($user);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	const lastDiv = useRef(null);

	useEffect(() => {
		getAllMessages(task.id, setMessages);
		setCommentsViewed(242);
	}, []);

	useEffect(() => {
		lastDiv.current.scrollIntoView();
	}, [messages]);

	// console.log(messages);
	// console.dir(user);
	// console.dir(task);
	// console.dir('render');

	return (
		<div className={styles.wrapper}>
			<div className={styles.messages_area}>
				{messages &&
					messages.map((message) => (
						<div
							className={`${styles.message} ${
								user.ID === message.senderID ? styles.my_message : styles.another_message
							}`}
							key={message.id}>
							<Avatar src={''} />
							<Message
								readed={message.view}
								name={message.senderName}
								date={message.date}
								text={message.Comment}
							/>
						</div>
					))}
				{/* Чат будет прокручиваться до этого элемента который будет всегда вконце чата */}
				<div ref={lastDiv} />
			</div>
			<div className={styles.input_area}>
				<textarea onChange={(e) => setMessage(e.target.value)} value={message}></textarea>
				<input
					onClick={() => {
						if (message) {
							sendMessage(user.ID, `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`, message, task.id, () =>
								getAllMessages(task.id, setMessages),
							);
							setMessage('');
						}
					}}
					type="image"
					src={Send}
				/>
			</div>
		</div>
	);
};

export default Chat;
