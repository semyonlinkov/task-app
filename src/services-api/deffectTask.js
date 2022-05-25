import { $linkServer } from "../$config";
import { mutateTask } from "../store/selectedTask";
import { sendNotification } from "./sendNot";

export const deffectTask = (id) => {
	let deffectComment = window.prompt('Укажите причину брака');

	if (!deffectComment) {
		alert('Нужно уквзать причину брака!');
		return;
	}

	const formData = new FormData();

	formData.append('id', id);
	formData.append('comment', deffectComment);


	if (deffectComment) {
		fetch(`${$linkServer}/deffectTask.php`, {
			method: "POST",
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				if (res) {
					// sendNotification(res[0].customerID, `Ваша задача "${res.title}" была изменена  от ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
					mutateTask({ historyJSON: JSON.stringify(res) })
				} else {
					alert('Произошла ошибка при отправке задачи в брак!');
				}
			})
			.catch(err => console.log(err))
	}
}