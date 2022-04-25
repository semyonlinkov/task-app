import React from 'react';
import styles from './VideoFile.module.scss';

const VideoFile = ({ src }) => {
	return (
		<div className={styles.video_wrapper}>
			<video controls muted className={styles.video}>
				<source src={src} type="video/mp4" />
			</video>
			<button>Удалить файл</button>
		</div>
	);
};

export default VideoFile;
