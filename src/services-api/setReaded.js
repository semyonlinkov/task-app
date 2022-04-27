import { $linkServer } from "../$config";

export const setReaded = (id) => {
	fetch(`${$linkServer}/setWatched.php?id=${id}`)
		.then(res => res.json())
		.then(res => console.log(res))
}



