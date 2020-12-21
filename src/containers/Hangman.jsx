import React, { Component } from 'react';
import '../styles/compileds/Hangman.css';
import img0 from '../images/hangman-0.jpg';
import img1 from '../images/hangman-1.jpg';
import img2 from '../images/hangman-2.jpg';
import img3 from '../images/hangman-3.jpg';
import img4 from '../images/hangman-4.jpg';
import img5 from '../images/hangman-5.jpg';
import img6 from '../images/hangman-6.jpg';
import { randomWord } from '../data/helpers';
import AlphaButtons from '../components/AlphaButtons';

class Hangman extends Component {
	static defaultProps = {
		maxWrong : 6,
		images   : [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	state = { answer: randomWord(), guessed: new Set(), nWrong: 0 };

	guessedWord = () => {
		const { answer, guessed } = this.state;
		let letters = answer.split('');
		let lettersToDisplay = letters.map(l => (guessed.has(l) ? l : '_'));
		return lettersToDisplay;
	};

	guess = l => {
		this.setState(({ answer, guessed, nWrong }) => ({
			guessed : guessed.add(l),
			nWrong  : nWrong + (answer.includes(l) ? 0 : 1)
		}));
	};

	hasWin = () => {
		const { answer, guessed } = this.state;
		const answerArray = answer.split('');
		let win = answerArray.reduce((acm, nxt) => {
			if (!guessed.has(nxt)) return false;
			return acm;
		}, true);
		return win;
	};

	handleRestart = () => {
		this.setState({
			answer  : randomWord(),
			guessed : new Set(),
			nWrong  : 0
		});
	};

	isDisabled = l => this.state.guessed.has(l);

	render () {
		const { guess, guessedWord, handleRestart, hasWin, isDisabled } = this;
		const { images, maxWrong } = this.props;
		const { answer, nWrong } = this.state;
		let displayRestartBtn = nWrong === maxWrong || hasWin();
		let hangmanImageSrc = images[nWrong];
		let hangmanImageAlt = `${nWrong}/${maxWrong} wrong guesses`;
		let hangmanImageStyle = { filter: 'none' };
		let content, word;

		if (!hasWin()) {
			if (maxWrong > nWrong) {
				content = (
					<AlphaButtons
						offset="A-Z"
						btnClassName="Hangman-letter-btn"
						guess={guess}
						isDisabled={isDisabled}
					/>
				);
				word = guessedWord();
			} else {
				content = <p className="Hangman-label">YOU LOSE!</p>;
				hangmanImageStyle.filter = 'grayscale(1)';
				word = answer;
			}
		} else {
			content = <p className="Hangman-label">YOU WIN!</p>;
		}

		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					src={hangmanImageSrc}
					alt={hangmanImageAlt}
					style={hangmanImageStyle}
				/>
				<p className="Hangman-nWrong">Number wrong: {nWrong}</p>
				<p className="Hangman-word">{word}</p>
				{content}
				{displayRestartBtn && (
					<button
						className="Hangman-restart-btn"
						type="button"
						onClick={handleRestart}>
						Play again!
					</button>
				)}
			</div>
		);
	}
}

export default Hangman;
