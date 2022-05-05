import { setIsLoading } from "../store/loadingState";
import { setSingleTask } from "../store/selectedTask";

export const sendFiles = (files, id) => {
	setIsLoading(true);
	let formData = new FormData();

	for (let key in files) {
		formData.append([key], files[key]);
	}

	formData.append("id", id);

	fetch('https://volga24bot.com/tasks/Files.php', {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			setIsLoading(false);
			console.log(res);
			
			setSingleTask(res);
		})
		.catch(err => console.log(err));
}