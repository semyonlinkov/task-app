import React, { useEffect, useRef, useState } from 'react';
import { $singleTask } from '../../../store/selectedTask';
import { $user } from '../../../store/user';
import styles from './Chat.module.scss';
import Message from './Message/Message';
import Send from '../../../img/sendMessage64.png';
import Avatar from './Avatar/Avatar';
import { useStore } from 'effector-react';
import { getAllMessages } from '../../../services-api/getAllMessages';
import { sendMessage } from '../../../services-api/sendMessage';
import { setCommentsViewed } from '../../../services-api/setCommentsViewed';
import { setIsLoading } from '../../../store/loadingState';

const Chat = () => {
	const task = useStore($singleTask);
	const user = useStore($user);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');

	const lastDiv = useRef(null);

	const sendMessageHandler = () => {
		if (message) {
			sendMessage(user.ID, `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`, message, task.id, () =>
				getAllMessages(task.id, setMessages, () => setIsLoading(false)),
			);
			setMessage('');
		}
	};

	useEffect(() => {
		setIsLoading(true);
		getAllMessages(task.id, setMessages, () => setIsLoading(false));
	}, [task.id]);

	useEffect(() => {
		lastDiv.current.scrollIntoView();

		if (messages.length) {
			let notReadedMessagesIdsArr = messages
				.filter((message) => message.senderID !== user.ID && message.view === '0')
				.map((message) => message.id);

			if (notReadedMessagesIdsArr.length) {
				setCommentsViewed(notReadedMessagesIdsArr, () =>
					getAllMessages(task.id, setMessages, () => setIsLoading(false)),
				);
			}
		}
	}, [messages, task.id, user.ID]);

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
				{/* Чат будет прокручиваться до этого элемента, который будет всегда вконце чата */}
				<div ref={lastDiv} />
			</div>
			<div className={styles.input_area}>
				<textarea
					onKeyUp={(e) => {
						if (e.key === 'Enter') {
							sendMessageHandler();
						}
					}}
					onChange={(e) => setMessage(e.target.value)}
					value={message}></textarea>
				<input onClick={sendMessageHandler} type="image" alt="send" src={Send} />
			</div>
		</div>
	);
};

export default Chat;
