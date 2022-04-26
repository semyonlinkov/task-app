import React from 'react';
import styles from './Avatar.module.scss';
import avatar from '../../../../img/avatar.png';

const Avatar = ({ src }) => {
	return (
		<div className={styles.wrapper}>
			<img src={src ? src : avatar} alt="avatar" />
		</div>
	);
};

export default Avatar;
