
const params = new URLSearchParams(window.location.search);
const username = params.get('username');

function insertPic(pic) {
	let img = new Image();
	img.src = pic;
	document.body.append(img);
}

function insertBio(bio) {
	let span = document.createElement('span');
	span.innerHTML = bio;
	document.body.append(span);
}

function insertName(name, link) {
	let a = document.createElement('a');
	a.innerHTML = name;
	a.href = link;
	document.body.append(a);
}

fetch(`https://api.github.com/users/${username}`)
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
		insertBio(userBio);
		insertPic(userAvatar);
		})