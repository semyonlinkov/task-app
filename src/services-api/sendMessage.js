import { $linkServer } from "../$config";

export function sendMessage(senderID, senderName, commentText, taskID, getAllMessage) {

	const formData = new FormData();

	formData.append('senderID', senderID);
	formData.append('senderName', senderName);
	formData.append('comment', commentText);
	formData.append('task', taskID);

	fetch(`${$linkServer}/comment.php`, {
		method: 'POST',
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			// console.log(res);
			getAllMessage();
		})
		.catch(err => console.log(err))
}