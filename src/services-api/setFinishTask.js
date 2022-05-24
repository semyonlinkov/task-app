import { $linkServer } from "../$config";

export const setFinishTask = (id, historyChange) => {



	fetch(`${$linkServer}/setConfirm.php?id=${id}`)
		.then(res => res.json())
		.then(res => {
			if (res) {
				alert('Задача выполнена!');
				historyChange();
			} else {
				alert('Произошла ошибка при отправке задачи в брак!');
			}
		})
}