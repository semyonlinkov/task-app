import { $linkServer } from "../$config"

export function getAllMessages(id, setMessages) {
	fetch(`${$linkServer}/getComments.php?id=${id}`)
		.then(res => res.json())
		.then(res => setMessages(res))
		.catch(err => console.log(err))
} 