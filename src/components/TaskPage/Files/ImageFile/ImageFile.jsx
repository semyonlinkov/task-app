import { useState } from 'react';

import PopUpImage from '../../../PopUpImage/PopUpImage';

const ImageFile = ({ src }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<img onClick={() => setIsOpen(true)} src={src} alt={src} />
			{isOpen && <PopUpImage src={src} alt={src} setIsOpen={() => setIsOpen(false)} />}
		</div>
	);
};

export default ImageFile;
