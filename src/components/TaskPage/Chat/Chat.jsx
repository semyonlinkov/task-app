import React, { useEffect, useState } from 'react';
import { $singleTask } from '../../../store/selectedTask';
import { $user } from '../../../store/user';
import styles from './Chat.module.scss';
import Message from './Message/Message';
import Send from '../../../img/send-message.png';
import Avatar from './Avatar/Avatar';
import { useStore } from 'effector-react';
import { getAllMessages } from '../../../services-api/getAllMessages';

const Chat = () => {
	const [messages, setMessages] = useState([]);
	const task = useStore($singleTask);
	const user = useStore($user);

	useEffect(() => {
		getAllMessages(task.id, setMessages);

		// console.log(task);
		// console.log(user);
		console.log(messages);
	}, []);


	return (
		<div className={styles.wrapper}>
			<div className={styles.messages_area}>
				<div className={`${styles.message} ${styles.my_message}`}>
					<Avatar src={''} />
					<Message message={''} readed={true} name={'Иван Иванов Иванович'} date={'12.12.1212'} text={''} />
				</div>
				<div className={`${styles.message} ${styles.another_message}`}>
					<Avatar src={''} />
					<Message message={''} readed={true} name={'Петр Петров Петрович'} date={'12.12.1212'} text={''} />
				</div>
				<div className={`${styles.message} ${styles.my_message}`}>
					<Avatar src={''} />
					<Message message={''} readed={false} name={'Иван Иванов Иванович'} date={'12.12.1212'} text={''} />
				</div>
			</div>
			<div className={styles.input_area}>
				<textarea onChange={(e) => console.log(e.target.value)}></textarea>
				<input onClick={() => console.log('click')} type="image" src={Send} />
			</div>
		</div>
	);
};

export default Chat;
