import { createTask } from "./createTask";

export const createTechTask = (form, user, changeHisory, tel) => {
	if (!form.executor) {
		alert('Нужно обязательно указать исполнителя')
		return
	}

	if (form?.executor.split(':')[0] === user.ID || form.coexecutor?.split(':')[0] === user.ID) {
		alert('Нельзя поставить задачу самому себе!');
		return;
	}

	let formData = new FormData();


	formData.append('customer', form.executor.split(':')[1]);
	formData.append('problem', form.comment);
	formData.append('creator', user.ID);
	formData.append('creatorName', `${user.LAST_NAME} ${user.NAME} ${user.SECOND_NAME}`);
	formData.append('datePlane', form.dateDeadline);
	formData.append('typeTask', 'Заявка'); //* в зависимости от типа задачи
	formData.append('clientFio', form.fullname);
	formData.append('clientPhone', tel);


	for (let key in form) {
		if (key !== 'files') {
			formData.append([key], form[key]);
		} else {
			for (let i = 0; i < form.files.length; i++) {
				formData.append([form.files[i].name], form.files[i])
			}
		}
	}

	fetch(`https://volga24bot.com/kartoteka/api/tech/createTechTask.php`, {
		method: "POST",
		body: formData
	})
		.then(res => res.json())
		.then(res => {
			if (res) {
				let sub_dep = '';

				if (form.type === 'Замена ключей') {
					sub_dep = 'Бухгалтерия,Склад';
				}

				createTask(form, user, changeHisory, tel, res, sub_dep);
			}
		})
		.catch(err => console.log(err));
}