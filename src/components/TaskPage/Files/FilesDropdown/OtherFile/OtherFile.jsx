import React from 'react';

const OtherFile = ({ src, fileName }) => {
	return (
		<>
			<a target="_blank" download={src} href={src}>
				{fileName}
			</a>
			<button>удалить</button>
		</>
	);
};

export default OtherFile;
