import { $linkServer } from "../$config";
import { sendNotification } from "./sendNot";

export const changeTask = (form, tel, user, setIsMainInfo, setSingleTask) => {
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
				sendNotification(res[0].customerID, `Ваша задача "${res[0].title}" была изменена  от ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
				setIsMainInfo();
				setSingleTask(res[0]);
			}
		})
		.catch(err => console.log(err));
}