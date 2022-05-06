import styles from './Report.module.scss';
import moment from 'moment';

const Report = ({ task }) => {
	// console.log(task);

	return (
		<div className={styles.wrapper}>
			<p className={styles.task_name}>Задача: {task.title}</p>
			<p className={styles.status}>Статус: {task.status}</p>
			<p className={styles.comment}>{task.report_comment}</p>
			<p className={styles.date}>{moment(task.timeEnd).format('DD.MM.YYYY')}</p>
		</div>
	);
};

export default Report;
