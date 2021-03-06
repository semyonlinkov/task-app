import React from 'react';
import styles from './Point.module.scss';
import moment from "moment";

const Point = ({ title, status, date, last }) => {
	return (
		<div className={styles.wrapper}>
			<div className={`${styles.point} ${status ? styles.active : null} ${title === 'Брак' ? styles.defect : null}`}>
				{!last && <div className={`${styles.stick} ${title !== "Брак" ? styles.active : styles.defect}`} />}
			</div>
			<div className={styles.info_block}>
				<p className={`${status ? styles.active_font : null} ${title === 'Брак' ? styles.defect_font : null}`}>
					{title}
				</p>
				<p className={styles.date}>{status ? moment(date).format('DD.MM.YYYY HH:mm:ss') : null}</p>
			</div>
		</div>
	);
};

export default Point;
