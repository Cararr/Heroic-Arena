class Async {
	static async getData(endpoint) {
		try {
			const response = await fetch('http://localhost:4000/' + endpoint);
			if (response.ok) {
				const jsonResponse = await response.json();
				return jsonResponse;
			}
			throw new Error('GET request failed!');
		} catch (error) {
			console.log(error.message);
		}
	}
}

export default Async;
