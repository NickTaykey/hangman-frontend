function getGameInfo (id) {
	return new Promise(async (resolve, reject) => {
		let res = await fetch(`/${id}`);
		let { error, ...game } = await res.json();
		if (!error) {
			return resolve(game);
		}
		return reject(error);
	});
}

export { getGameInfo };
