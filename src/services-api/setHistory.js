/**
 * @id - id задачи
 * @type - 'comment', 'change',
 * @value - для коммента
 * @user - имя
 * @alert - функция алерта если нужно
 */
export const setHistory = (id, type, value, user, alert = () => { }) => {
	let formData = new FormData();

	formData.append('id', id); //* id задвчи
	formData.append('type', type);
	formData.append('value', value);
	formData.append('user', user);

	fetch('https://volga24bot.com/tasks/pushToHistory.php', {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				alert();
			}
		})
}