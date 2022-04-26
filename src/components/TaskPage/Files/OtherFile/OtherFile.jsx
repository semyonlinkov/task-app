import React from 'react';
import trash from '../../../../img/trash.png';
import styles from './OtherFile.module.scss';

const OtherFile = ({ src, fileName }) => {
	return (
		<div className={styles.wrapper}>
			<a target="_blank" download={src} href={src}>
				{fileName}
			</a>
			<input type="image" src={trash} />
		</div>
	);
};

export default OtherFile;
