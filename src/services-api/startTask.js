import { $linkServer } from "../$config";
import { mutateTask } from "../store/selectedTask";

export const startTask = (id) => {
	fetch(`${$linkServer}/startTask.php?id=${id}`)
		.then(res => res.json())
		.then(res => {
			if (res) {
				mutateTask({ status: 'В работе', timeStart: res })
			} else {
				alert('Произошла ошибка при старте задачи!')
			}
		})
}



