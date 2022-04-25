import React from 'react';
import styles from './VideoFile.module.scss';

const VideoFile = ({ src }) => {
	return (
		<div className={styles.wrapper}>
			<video controls muted>
				<source src={src} type="video/mp4" />
			</video>
			<button>Удалить файл</button>
		</div>
	);
};

export default VideoFile;
