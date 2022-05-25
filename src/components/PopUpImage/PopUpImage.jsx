import React, { useCallback, useRef } from 'react';
import QuickPinchZoom, { make3dTransformValue } from 'react-quick-pinch-zoom';
import styles from './PopUpImage.module.scss';
import Close from '../../img/close128.png';

const PopUpImage = ({ src, setIsOpen }) => {
	const imgRef = useRef();

	const onUpdate = useCallback(({ x, y, scale }) => {
		const { current: img } = imgRef;

		if (img) {
			const value = make3dTransformValue({ x, y, scale });

			img.style.setProperty('transform', value);
		}
	}, []);

	return (
		<div className={styles.wrapper}>
			<input type="image" src={Close} onClick={setIsOpen} />
			<QuickPinchZoom onUpdate={onUpdate}>
				<img ref={imgRef} src={src} alt={src} />
			</QuickPinchZoom>
		</div>
	);
};

export default PopUpImage;
