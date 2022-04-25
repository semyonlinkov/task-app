const getFiles = async (id, fileName) => {
	fetch(`https://volga24bot.com/tasks/taskFiles/${id}/${fileName}`)
		.then(res => res.json())
		.then(res => console.log(res));
}