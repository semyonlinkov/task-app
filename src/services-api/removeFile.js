import { setIsLoading } from "../store/loadingState";
import { setSingleTask } from "../store/selectedTask";

export const removeFile = (files, id, fileName) => {
	setIsLoading(true);

	const filesArr = files.split(';');
	const index = filesArr.indexOf(fileName);

	filesArr.splice(index, 1);

	let formData = new FormData();

	formData.append('id', id);
	formData.append('item', fileName);
	formData.append('files', filesArr.join(';'));

	console.log(id);
	console.log(filesArr.join(';'));
	console.log(fileName);

	fetch('https://volga24bot.com/tasks/deleteFile.php', {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			setIsLoading(false);
			setSingleTask(res);
			console.log(res);
		})
		.catch(err => console.log(err));
}