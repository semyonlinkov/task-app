import React, { useState } from 'react';
import styles from './Info.module.scss';

import edit from '../../../img/edit.png';
import done from '../../../img/checkBlue.png';

import MainInfo from './MainInfo/MainInfo';
import ChangeInfo from './ChangeInfo/ChangeInfo';
import { $singleTask } from '../../../store/selectedTask';
import { useStore } from 'effector-react';
import { $user } from '../../../store/user';

const MainData = () => {
	const task = useStore($singleTask);
	const user = useStore($user);
	const [isMainInfo, setIsMainInfo] = useState(true);

	return (
		<div className={styles.wrapper}>
			{task.creatorID === user.ID && (
				<input type="image" src={isMainInfo ? edit : done} onClick={() => setIsMainInfo((prev) => !prev)} />
			)}
			{isMainInfo ? <MainInfo /> : <ChangeInfo />}
		</div>
	);
};

export default MainData;
