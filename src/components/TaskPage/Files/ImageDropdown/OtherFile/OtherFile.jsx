import React from 'react';

const OtherFile = ({ src }) => {
	console.log(src);

	return (
		<>
			<a target="_blank" download={src} href={src}>
				Скачать
			</a>
			<button>Удалить файл</button>
		</>
	);
};

export default OtherFile;
