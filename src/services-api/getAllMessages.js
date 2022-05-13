import { $linkServer } from "../$config"

export const getAllMessages = function (id, setMessages) {
	fetch(`${$linkServer}/getComments.php?id=1652424166`)
		.then(res => res.json())
		.then(res => setMessages(res))
		.catch(err => console.log(err))
} 