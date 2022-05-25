import { $linkServer } from "../$config";
import {sendNotification} from "./sendNot";

export const createTask = (form, user, changeHisory, tel) => {

	if (form?.executor.split(':')[0] === user.ID || form.coexecutor?.split(':')[0] === user.ID) {
		alert('Нельзя поставить задачу самому себе!');
		return;
	}

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
				sendNotification(form.executor.split(':')[0], `Вам поставлена новая задача "${form.type}" от ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
				alert('Задача создана!');
				changeHisory();
			}
		})
		.catch(err => console.log(err));
}