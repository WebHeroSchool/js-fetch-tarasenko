
const params = new URLSearchParams(window.location.search);
const username = params.get('username');

function insertPic(pic) {
	const main = document.querySelector('main');
	let img = new Image();
	img.src = pic;
	main.append(img);
}

function insertData(data) {
	const main = document.querySelector('main');
	let span = document.createElement('span');
	span.innerHTML = data;
	main.append(span);
}

function insertName(name, link) {
	const main = document.querySelector('main');
	let a = document.createElement('a');
	a.innerHTML = name;
	a.href = link;
	main.append(a);
}

const getDate = new Promise((resolve, reject) => {
	setTimeout(() => {
		let date = new Date();
		date = date.toDateString();
		resolve(date);
	}, 3000);
});

const getName = new Promise((resolve, reject) =>  {
	setTimeout(() => username ? resolve(username) : reject(new Error("Пользователь не найден")), 5000)
})

Promise.all([getDate, getName])
	.then(([date, username]) => {
		insertData(date);
		return fetch(`https://api.github.com/users/${username}`);
	})
	.then(response => {
		if (response.ok) return response.json()
		else alert("Информация о пользователе не доступна")
	})
	.then(json => {
		let userAvatar = json.avatar_url;
		let userName = json.name;
		let userBio = json.bio;
		let userUrl = json.html_url;
		insertName(userName, userUrl);
		insertData(userBio);
		insertPic(userAvatar);
	})
	.then(() => {
		const section = document.querySelector('section');
		const main = document.querySelector('main');
		section.classList.add('hidden');
		main.classList.remove('hidden');
	})
	.catch(alert);

