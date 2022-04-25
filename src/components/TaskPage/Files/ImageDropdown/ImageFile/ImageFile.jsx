import React from 'react';

const ImageFile = ({ src }) => {
	return (
		<div>
			<img src={src} alt={src} />
			<button>Удалить файл</button>
		</div>
	);
};

export default ImageFile;
