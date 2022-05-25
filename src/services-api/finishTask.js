import { $linkServer } from "../$config";
import { sendNotification } from "./sendNot";

export const finishTask = (form, task, user, deffect, changeHistory) => {
	let formData = new FormData();

	formData.append('firstTime', task.timeStart)
	formData.append('id', task.id)
	formData.append('deffect', deffect)

	for (let key in form) {
		if (key !== 'files') {
			formData.append([key], form[key]);
		} else {
			for (let i = 0; i < form.files.length; i++) {
				formData.append([form.files[i].name], form.files[i])
			}
		}
	}

	console.log(task);
	console.log(user);


	fetch(`${$linkServer}/finishTask.php`, {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {

				sendNotification(task.creatorID, `Ваша поставленная задача "${task.title}" была выполнена ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
				alert('Отчёт отправлен!');
				changeHistory();
			}
		})
		.catch(err => console.log(err));
}