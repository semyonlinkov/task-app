import React, { useEffect, useState } from 'react';
import styles from './Info.module.scss';

import edit from '../../../img/edit.png';
import done from '../../../img/checkBlue.png';

import MainInfo from './MainInfo/MainInfo';
import ChangeInfo from './ChangeInfo/ChangeInfo';

const MainData = () => {
	const [isMainInfo, setIsMainInfo] = useState(true);

	return (
		<div className={styles.wrapper}>
			<input type="image" src={isMainInfo ? edit : done} onClick={() => setIsMainInfo((prev) => !prev)} />
			{isMainInfo ? <MainInfo /> : <ChangeInfo />}
		</div>
	);
};

export default MainData;
