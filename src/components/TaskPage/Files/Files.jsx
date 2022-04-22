import { useStore } from 'effector-react';
import React from 'react';
import { $showSingleTask } from '../../../store/tasks';

const Files = () => {
	const task = useStore($showSingleTask);

	return <div>Files</div>;
};

export default Files;
