import { useStore } from 'effector-react';
import React from 'react';
import {$singleTask} from "../../../store/selectedTask";

const History = () => {
	const task = useStore($singleTask);
	return <div>History</div>;
};

export default History;
