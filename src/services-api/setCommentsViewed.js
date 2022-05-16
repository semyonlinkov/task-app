export function setCommentsViewed(commentsId, getAllMessages) {

	const formData = new FormData();

	formData.append('ids', JSON.stringify(commentsId));

	fetch(`https://volga24bot.com/tasks/readComments.php`, {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				getAllMessages();
			}
		})
		.catch(err => console.log(err))
}