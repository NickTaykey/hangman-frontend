import axios from 'axios';

const API_URL = 'https://hanggame-backend.herokuapp.com/games';

function getGameInfo (id) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.get(`${API_URL}/${id}`);
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

function createGame (data) {
	return new Promise(async (resolve, reject) => {
		let { error, ...res } = await axios.post(`${API_URL}`, data);
		if (!error) {
			return resolve(res.data);
		}
		return reject(error);
	});
}

export { getGameInfo, createGame };
