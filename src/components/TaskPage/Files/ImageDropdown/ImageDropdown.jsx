import React, { useState } from 'react';
import styles from './ImageDropdown.module.scss';

const ImageDropdown = ({ src, alt }) => {
	const [isOpen, setIsOpen] = useState(false);

	const openToggle = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<div className={styles.wrapper}>
			<div className={styles.dropdown} onClick={openToggle}>
				Open/Close
			</div>
			{isOpen && (
				<>
					<img src={src} alt={alt} />
					<button>Удалить файл</button>
				</>
			)}
		</div>
	);
};

export default ImageDropdown;
