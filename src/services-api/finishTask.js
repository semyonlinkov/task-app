import { $linkServer } from "../$config";

export const finishTask = (form, id, timeStart, changeHistory) => {

	let formData = new FormData();
	formData.append('firstTime', timeStart)
	formData.append('id', id)
	for (let key in form) {
		if (key !== 'files') {
			formData.append([key], form[key]);
		} else {
			for (let i = 0; i < form.files.length; i++) {
				formData.append([form.files[i].name], form.files[i])
			}
		}
	}

	fetch(`${$linkServer}/finishTask.php`, {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			console.log(res)
			if (res) {
				alert('Отчёт отправлен!');
				changeHistory();
			}
		})
		.catch(err => console.log(err));
}