import { $linkServer } from "../$config"

export function getObjects() {
	fetch(`${$linkServer}/getComments.php?id=${id}`)
		.then(res => res.json())
		.then(res => console.log(res))
		.catch(err => console.log(err))
} 