import { $linkServer } from "../$config";
import { mutateTask } from "../store/selectedTask";
import { sendNotification } from "./sendNot";

export const deffectTask = (task, user) => {
	let deffectComment = window.prompt('Укажите причину брака');

	if (!deffectComment) {
		alert('Нужно уквзать причину брака!');
		return;
	}

	const formData = new FormData();

	formData.append('id', task.id);
	formData.append('comment', deffectComment);

	console.log(task, 'task');
	console.log(user, 'user');


	if (deffectComment) {
		fetch(`${$linkServer}/deffectTask.php`, {
			method: "POST",
			body: formData
		})
			.then(res => res.json())
			.then(res => {
				if (res) {
					sendNotification(task.customerID, `Ваша задача "${task.title}" была добавленна в брак от ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
					mutateTask({ historyJSON: JSON.stringify(res) })
				} else {
					alert('Произошла ошибка при отправке задачи в брак!');
				}
			})
			.catch(err => console.log(err))
	}
}