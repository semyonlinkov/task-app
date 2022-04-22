import { useStore } from 'effector-react';
import React from 'react';
import { $showSingleTask } from '../../../store/tasks';

const History = () => {
	const task = useStore($showSingleTask);

	return <div>History</div>;
};

export default History;
