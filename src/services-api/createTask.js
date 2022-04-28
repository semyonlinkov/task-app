export const createTask = (form, user, changeHisory, tel, checkbox) => {
	let formData = new FormData();

	formData.append('creatorID', user.ID);
	formData.append('clientPhoneNumber', tel);
	formData.append('creatorName', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`);
	if (checkbox) {
		fetch(`https://volga24bot.com/sms/send_sms.php?tel=${tel}&message=Ваша заявка принята и поставлена в очередь выполнения`)
	}

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

		})
		.catch(err => console.log(err));
}