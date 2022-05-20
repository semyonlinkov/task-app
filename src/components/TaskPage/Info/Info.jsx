import React, { useState } from 'react';
import styles from './Info.module.scss';

import ImgEdit from '../../../img/edit32.png';
import ImgClose from '../../../img/closeRedCircle32.png';

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
				<input
					alt={isMainInfo ? 'edit' : 'cross'}
					type="image"
					className={isMainInfo ? styles.cross : styles.edit}
					src={isMainInfo ? ImgEdit : ImgClose}
					onClick={() => setIsMainInfo((prev) => !prev)}
				/>
			)}
			{isMainInfo ? <MainInfo /> : <ChangeInfo setIsMainInfo={() => setIsMainInfo(true)} />}
		</div>
	);
};

export default MainData;
