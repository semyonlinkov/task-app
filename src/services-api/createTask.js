export const createTast = (form, user, changeHisory) => {
	let formData = new FormData();

	formData.append('creatorID', user.ID);
	formData.append('creatorName', `${user.NAME} ${user.LAST_NAME} ${user.SECOND_NAME}`);

	console.log(form);

	for (let key in form) {
		if (key !== 'files') {
			formData.append([key], form[key]);
		} else {
			for (let i = 0; i < form.files.length; i++) {
				formData.append([form.files[i].name], form.files[i])
			}
		}
	}

	fetch("https://volga24bot.com/tasks/createTask.php", {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				alert('Задача создана!');
				changeHisory();
			}
			console.log(res);
		})
		.catch(err => console.log('ОПЯТЬ ХУЙНЮ ОТПРАВИЛ((((', err));
}