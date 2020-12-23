import axios from 'axios';

function getGameInfo (id) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.get(`/${id}`);
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

function createGame (data) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.post('/', data);
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

export { getGameInfo, createGame };
