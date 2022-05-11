import styles from './Report.module.scss';
import moment from 'moment';

const Report = ({ title, status, comment, date, type }) => {
	return (
		<div className={`${styles.wrapper} ${type === 'deffect' ? styles.deffect : styles.report}`}>
			<p className={styles.status}>Статус: {status}</p>
			<p className={styles.task_name}>Задача: {title}</p>
			<p className={styles.comment}>{comment}</p>
			<p className={styles.date}>{moment(date).format('DD.MM.YYYY')}</p>
		</div>
	);
};

export default Report;
