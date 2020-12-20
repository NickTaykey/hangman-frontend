import { words } from './words.json';

function randomWord () {
	let index = Math.floor(Math.random() * words.length);
	return words[index];
}

export { randomWord };
