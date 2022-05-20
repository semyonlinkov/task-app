import { useStore } from 'effector-react';
import ImgDelete from '../../../../img/deleteBin32.png';
import { removeFile } from '../../../../services-api/removeFile';
import { $singleTask } from '../../../../store/selectedTask';
import { $user } from '../../../../store/user';
import styles from './OtherFile.module.scss';

const OtherFile = ({ src, fileName }) => {
	const task = useStore($singleTask);
	const user = useStore($user);

	return (
		<div className={styles.wrapper}>
			<a target="_blank" download={src} href={src}>
				{fileName}
			</a>
			{task.creatorID === user.ID && (
				<input type="image" src={ImgDelete} onClick={() => removeFile(task.files, task.id, fileName)} />
			)}
		</div>
	);
};

export default OtherFile;
