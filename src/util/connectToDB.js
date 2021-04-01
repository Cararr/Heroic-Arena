const PATH = 'https://heroic-arena-api.herokuapp.com';
// const PATH = 'http://localhost:4000';

export default class DB {
	static async getWorlds() {
		try {
			const response = await fetch(`${PATH}/worlds/`);
			if (response.ok) {
				const jsonRespone = response.json();
				return jsonRespone;
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	static async getHeroes() {
		try {
			const response = await fetch(`${PATH}/heroes`);
			if (response.ok) {
				const jsonRespone = response.json();
				return jsonRespone;
			}
		} catch (error) {
			console.log(error.message);
		}
	}

	static async logIn(userCredentials) {
		const fullPath = `${PATH}/login`;
		try {
			const response = await fetch(fullPath, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userCredentials),
			});
			const jsonRespone = await response.json();
			return jsonRespone;
		} catch (error) {
			console.log(error.message);
		}
	}

	static async register(registerForm) {
		if (registerForm.password !== registerForm.confirmPassword) {
			alert('Confirm your password correctly!');
			return;
		}
		const fullPath = `${PATH}/register`;
		try {
			const response = await fetch(fullPath, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					user: { name: registerForm.name, password: registerForm.password },
				}),
			});
			if (response.ok) return 'You can now log in with your new account.';
			const errorResponse = await response.json();
			if (errorResponse.errno === 19) return 'Name already taken.';
		} catch (error) {
			console.log(error.message);
		}
	}

	static async addToDB(type, objectToAdd) {
		let fullPath;
		if (type === 'world') fullPath = `${PATH}/worlds/`;
		else if (type === 'hero') {
			if (!objectToAdd.world_id) return `Please select Hero's world!`;
			if (
				objectToAdd.power_level &&
				(objectToAdd.power_level > 100 || objectToAdd.power_level < 1)
			)
				return `Incorrect power level! Must be between 1 and 100.`;
			fullPath = `${PATH}/worlds/${objectToAdd.world_id}/heroes/`;
		}
		try {
			const response = await fetch(fullPath, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ [type]: objectToAdd }),
			});
			const jsonRespone = await response.json();
			if (response.ok) return jsonRespone;
			else if (response.status === 400) return jsonRespone.error;
			else return jsonRespone.error.stack;
		} catch (error) {
			console.log(error.message);
		}
	}

	static async updateInDB(type, updatedObjectData) {
		let fullPath;
		if (type === 'world') fullPath = `${PATH}/worlds/${updatedObjectData.id}`;
		else if (type === 'hero') {
			if (
				updatedObjectData.power_level > 100 ||
				updatedObjectData.power_level < 1
			)
				return `Incorrect power level! Must be between 1 and 100.`;
			fullPath = `${PATH}/worlds/${updatedObjectData.world_id}/heroes/${updatedObjectData.id}`;
		}

		try {
			const response = await fetch(fullPath, {
				method: 'PUT',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ [type]: updatedObjectData }),
			});

			const jsonRespone = await response.json();

			if (response.ok) return jsonRespone;
			else if (response.status === 400) return jsonRespone.error;
			else return jsonRespone.error.stack;
		} catch (error) {
			console.log(error.message);
		}
	}

	static async deleteFromDB(type, objectToDelete) {
		let fullPath;
		if (type === 'world') fullPath = `${PATH}/worlds/${objectToDelete.id}`;
		else if (type === 'hero')
			fullPath = `${PATH}/worlds/${objectToDelete.worldId}/heroes/${objectToDelete.id}`;
		try {
			const response = await fetch(fullPath, { method: 'DELETE' });
			if (response.status === 204) return objectToDelete.id;
			else if (response.status === 400) {
				const responseText = await response.text();
				return responseText;
			}
		} catch (error) {
			console.log(error.message);
		}
	}
}
