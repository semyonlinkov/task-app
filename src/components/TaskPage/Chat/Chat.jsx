import { useStore } from 'effector-react';
import React from 'react';
import { $showSingleTask } from '../../../store/tasks';

const Chat = () => {
	const task = useStore($showSingleTask);

	return <div>Chat</div>;
};

export default Chat;
