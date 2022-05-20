import React from 'react';
import styles from './Avatar.module.scss';
import ImgAvatar from '../../../../img/avatar32.png';

const Avatar = ({ src }) => {
	return (
		<div className={styles.wrapper}>
			<img src={src ? src : ImgAvatar} alt="avatar" />
		</div>
	);
};

export default Avatar;
