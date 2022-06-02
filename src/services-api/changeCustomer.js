import { $linkServer } from "../$config";
import { setSingleTask } from "../store/selectedTask";
import { sendNotification } from "./sendNot";

export const changeCustomer = (form, close) => {
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
				// console.log(res);

				sendNotification(res[0].so_customerID, `Вам передана задача "${res[0].title}" от ${res[0].customer} [URL=https://volga-shield.bitrix24.ru/marketplace/app/181/]Ссылка[/URL]`);
				setSingleTask(res[0]);
				close();
			}
		})
		.catch(err => console.log(err));
}