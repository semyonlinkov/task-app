import { $linkServer } from "../$config";
import { mutateTask } from "../store/selectedTask";

export const startTask = ({ taskID, userID, userName }) => {
	fetch(`${$linkServer}/startTask.php?id=${taskID}&userID=${userID}&userName=${userName}`)
		.then(res => res.json())
		.then(res => {
			if (res) {
				mutateTask({ status: 'В работе', timeStart: res })
			} else {
				alert('Произошла ошибка при старте задачи!')
			}
		})
}