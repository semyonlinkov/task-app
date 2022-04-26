import React from 'react';

const ImageFile = ({ src }) => {
	return (
		<div>
			<img src={src} alt={src} />
		</div>
	);
};

export default ImageFile;
