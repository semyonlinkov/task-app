export function setCommentsViewed(commentsId) {
	const formData = new FormData();

	formData.append('id', commentsId);
	// console.log(formData);

	fetch(`https://volga24bot.com/tasks/readComments.php`, {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.log(err))
}