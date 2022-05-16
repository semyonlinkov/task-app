import { $linkServer } from "../$config"

export function getAllMessages(id, setMessages, setIsLoading) {
	fetch(`${$linkServer}/getComments.php?id=${id}`)
		.then(res => res.json())
		.then(res => {
			setMessages(res);
			setIsLoading();
		})
		.catch(err => console.log(err))
} 