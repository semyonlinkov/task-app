import React from 'react';

const VideoFile = ({ src }) => {
	return (
		<>
			<video controls muted>
				<source src={src} type="video/mp4" />
			</video>
		</>
	);
};

export default VideoFile;
