import { $linkAndromedaServer } from "../$config"

export function getAllObjects(setAllObjects) {
	fetch(`${$linkAndromedaServer}/getObjects.php`)
		.then(res => res.json())
		.then(res => {
			setAllObjects(res)
		})
		.catch(err => console.log(err))
} 