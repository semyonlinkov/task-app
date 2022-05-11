import { setIsLoading } from "../store/loadingState";

export const sendFiles = (files, id, setSingleTask) => {
	if (!files.length) return;

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
			setSingleTask(res);
		})
		.catch(err => console.log(err));
}