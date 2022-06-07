export function sendNotification(userID, message) {

	const formData = new FormData();

	formData.append('userId', userID);
	formData.append('message', message);

	fetch(`https://volga24bot.com/bot/notification_tasks.php`, {
		method: 'POST',
		body: formData
	})

}