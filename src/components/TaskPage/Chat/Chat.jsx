import { useStore } from 'effector-react';
import React from 'react';
import { $showSingleTask } from '../../../store/tasks';
import styles from './Chat.module.scss';
import Message from './Message/Message';

const Chat = () => {
	const task = useStore($showSingleTask);

	console.log(task);

	return (
		<div className={styles.wrapper}>
			<div className={styles.messages_area}>
				{/* <Message name={name} message={message} id={id} /> */}
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
				<Message />
			</div>
			<div className={styles.input_area}>
				<textarea></textarea>
				<button>Send</button>
			</div>
		</div>
	);
};

export default Chat;
