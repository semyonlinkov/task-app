import { $linkServer } from "../$config";

export const createTask = (form, user, changeHisory, tel) => {

	let formData = new FormData();

	formData.append('creatorID', user.ID);
	formData.append('clientPhoneNumber', tel);
	formData.append('creatorName', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`);

	for (let key in form) {
		if (key !== 'files') {
			formData.append([key], form[key]);
		} else {
			for (let i = 0; i < form.files.length; i++) {
				formData.append([form.files[i].name], form.files[i])
			}
		}
	}

	fetch(`${$linkServer}/createTask.php`, {
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