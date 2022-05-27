import { $linkServer } from "../$config";
import { sendNotification } from "./sendNot";

export const changeCustomer = (form) => {
	let formData = new FormData();

	for (let key in form) {
		formData.append([key], form[key]);
	}

	fetch(`${$linkServer}/changeCustomer.php`, {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				alert('Задача передана другому исполнителю!');
				console.log(res);

				// sendNotification(res[0].customerID, `Ваша задача "${res[0].title}" была изменена  от ${user.LAST_NAME} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
				// setIsMainInfo();
				// setSingleTask(res[0]);
			}
		})
		.catch(err => console.log(err));
}