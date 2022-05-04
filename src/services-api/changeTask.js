import { $linkServer } from "../$config";

export const changeTask = (form, tel, user, onClick, setSingleTask) => {
	let formData = new FormData();

	formData.append('creatorID', user.ID);
	formData.append('clientPhoneNumber', tel);
	formData.append('creatorName', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`);

	for (let key in form) {
		formData.append([key], form[key]);
	}

	fetch(`${$linkServer}/changeData.php`, {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				alert('Задача изменена!');
				setSingleTask(res[0])
				onClick();
			}
			console.log(res);
		})
		.catch(err => console.log(err));
}