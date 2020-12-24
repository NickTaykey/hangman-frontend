import React, { Component } from 'react';
import '../styles/compileds/Hangman.min.css';
import img0 from '../images/hangman-0.jpg';
import img1 from '../images/hangman-1.jpg';
import img2 from '../images/hangman-2.jpg';
import img3 from '../images/hangman-3.jpg';
import img4 from '../images/hangman-4.jpg';
import img5 from '../images/hangman-5.jpg';
import img6 from '../images/hangman-6.jpg';
import { randomWord } from '../data/helpers';
import { getGameInfo } from '../helpers/api';
import AlphaButtons from '../components/AlphaButtons';

class Hangman extends Component {
	static defaultProps = {
		images : [ img0, img1, img2, img3, img4, img5, img6 ]
	};

	state = {
		answer     : '',
		guessed    : new Set(),
		nWrong     : 0,
		maxWrong   : null,
		error      : null,
		imageIndex : 0
	};

	async componentDidMount () {
		const { id } = this.props.match.params;
		try {
			let { word, attempts } = await getGameInfo(id);
			this.setState({ answer: word, maxWrong: attempts });
		} catch (error) {
			this.setState({ error });
		}
	}

	guessedWord = () => {
		const { answer, guessed } = this.state;
		let letters = answer.split('');
		let lettersToDisplay = letters.map(l => (guessed.has(l) ? l : '_'));
		return lettersToDisplay;
	};

	guess = l => {
		let { answer, maxWrong, nWrong, imageIndex, guessed } = this.state;
		const { images } = this.props;
		const isLetterCorrect = answer.includes(l);
		guessed.add(l);

		if (!isLetterCorrect) {
			nWrong++;
			let updateFrequency = Math.round(maxWrong / (images.length - 1));
			if (imageIndex < 5) {
				if (nWrong >= updateFrequency && nWrong % updateFrequency === 0)
					imageIndex++;
			} else if (maxWrong === nWrong) imageIndex++;
		}
		this.setState({ guessed, nWrong, imageIndex });
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
		const { images } = this.props;
		let { answer, error, nWrong, maxWrong, imageIndex } = this.state;
		let displayRestartBtn = nWrong === maxWrong || hasWin();
		let hangmanImageSrc = images[imageIndex];
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
				{error && (
					<div className="Hangman-error">
						<h1 className="Error-heading">404</h1>
						<strong className="Error-message">Game not found</strong>
						<pre className="Error-cause">Invalid Id</pre>
					</div>
				)}
				{!error && (
					<div className="Hangman-game">
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
								className="Hangman-success-btn"
								type="button"
								onClick={handleRestart}>
								Play again!
							</button>
						)}
					</div>
				)}
			</div>
		);
	}
}

export default Hangman;
