const URL = 'https://test-users-api.herokuapp.com/';
const container = document.querySelector('.container');


const usersRequest = axios.create({
	baseURL: URL
});

const getUsers = async () => {
	try {
		const response = await usersRequest.get('users/');
		renderUsers(response.data.data);
	}
	catch(err) {
		console.log("can't get user", err);
	}
	
};
 getUsers();

const renderUsers = (users) => {
	users.forEach(user => {
		const userCard = document.createElement('div');
		userCard.classList.add('user-card');

		const nameInput = document.createElement('input');
		nameInput.setAttribute('type', 'text');
		nameInput.setAttribute('autocomplete', 'off');
		nameInput.value = user.name;
		

		const ageInput = document.createElement('input');
		ageInput.setAttribute('type', 'text');
		ageInput.setAttribute('autocomplete', 'off');
		ageInput.value = user.age;

		const updateBtn = document.createElement('button');
		updateBtn.textContent = 'Update';
		updateBtn.addEventListener('click', () => {updateUser(user)});
		updateBtn.classList.add('update-btn');

		const removeBtn = document.createElement('button');
		removeBtn.textContent = 'X';
		removeBtn.addEventListener('click', () => {removeUser(user.id, userCard)});
		removeBtn.classList.add('remove-btn');

		userCard.append(removeBtn);
		userCard.append(nameInput);
		userCard.append(ageInput);
		userCard.append(updateBtn);

		container.append(userCard);
	});
}


const addUser = async () => {
	const name = document.querySelector('#name').value;
    const age = document.querySelector('#age').value;
    const user = { name, age };
	
	try {
		const postUser = await usersRequest.post('users/', user);
		document.querySelector('#name').value = '';
        document.querySelector('#age').value = '';
		

		if (postUser.data.status >= 200 && postUser.data.status <= 300) {
			renderUsers([user]);
		}
		else {
			throw new Error();
		}
	}
	catch(err) {
		console.log("can't create user! ", err);
	}
}
const addBtn = document.querySelector('#add-user-btn');
addBtn.addEventListener('click', addUser);



const removeUser = async (userId, userCard) => {
	try {
		const deleteUser = await usersRequest.delete('users/:' + `${userId}`);
		if (deleteUser.status === 200) {
			userCard.remove();
		}
		else {
			throw new Error();
		}
	}
	catch(err) {
		console.log("cannot delete users", err);
	}
}

const updateUser = async (user) => {
	try {
		const putUserResponse = await usersRequest.put(`users/${user.id}`, {
			name: user.name,
			age: user.age
		});
		if (putUserResponse.data.status >= 200 && putUserResponse.data.status < 300 ) {
			console.log(putUserResponse.data);
		}
		else {
			throw new Error();
		}
	} catch (err) {
		console.log("can't update current user", err);
	}	
}

