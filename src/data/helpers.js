import { letters, words } from './data.json';

function randomWord () {
	let index = Math.floor(Math.random() * words.length);
	return words[index];
}

function lettersArray (offset) {
	offset = offset.toLowerCase();
	let [ l1, l2 ] = offset.split('-');
	let idx1 = letters.indexOf(l1);
	let idx2 = letters.indexOf(l2) + 1;
	return letters.slice(idx1, idx2);
}

export { lettersArray, randomWord };
