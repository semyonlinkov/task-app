import { $linkServer } from "../$config";

export const deffectTask = (id, historyChange, setSingleTask) => {
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
					setSingleTask(res[0]);
					historyChange();
				} else {
					alert('Произошла ошибка при отправке задачи в брак!');
				}
			})
			.catch(err => console.log(err))
	}
}