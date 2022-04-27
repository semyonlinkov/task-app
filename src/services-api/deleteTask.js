import { $linkServer } from "../$config";


export const deleteTask = (id, historyChange) => {
	let answer = window.confirm('Вы уверены что хотите удалить задачу?')
	if (answer) {
		fetch(`${$linkServer}/deleteTask.php?id=${id}`)
			.then(res => res.json())
			.then(res => {
				if (res) {
					historyChange()
				} else {
					alert('Произошла ошибка при удалении!')
				}
			})
	}

}