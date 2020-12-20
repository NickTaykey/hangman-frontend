import React, { Component } from 'react';
import '../styles/Hangman.css';
import img0 from '../images/0.jpg';
import img1 from '../images/1.jpg';
import img2 from '../images/2.jpg';
import img3 from '../images/3.jpg';
import img4 from '../images/4.jpg';
import img5 from '../images/5.jpg';
import img6 from '../images/6.jpg';
import { randomWord } from '../data/words';
import AlphaButtons from '../components/AlphaButtons';

class Hangman extends Component {
	/** by default, allow 6 guesses and use provided gallows images. */
	static defaultProps = {
		maxWrong : 6,
		images   : [
			img0,
			img1,
			img2,
			img3,
			img4,
			img5,
			img6
		]
	};

	constructor (props) {
		super(props);
		let answer = randomWord();
		console.log(answer);
		this.state = { nWrong: 0, guessed: new Set(), answer };
		this.guess = this.guess.bind(this);
		this.handleRestart = this.handleRestart.bind(this);
		this.isDisabled = this.isDisabled.bind(this);
	}

	/** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
	guessedWord () {
		return this.state.answer
			.split('')
			.map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
	}

	/** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
	guess (ltr) {
		this.setState(st => ({
			guessed : st.guessed.add(ltr),
			nWrong  : st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
		}));
	}

	/** generateButtons: return array of letter buttons to render */
	generateButtons () {
		return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
			<button
				key={ltr}
				className="Hangman-letter-btn"
				value={ltr}
				onClick={this.guess}
				disabled={this.state.guessed.has(ltr)}>
				{ltr}
			</button>
		));
	}

	hasWin () {
		return this.state.answer.split('').reduce((acm, nxt) => {
			if (!this.state.guessed.has(nxt)) {
				return false;
			}
			return acm;
		}, true);
	}

	handleRestart () {
		let answer = randomWord();
		console.log(answer);
		this.setState({
			answer,
			nWrong  : 0,
			guessed : new Set()
		});
	}
	isDisabled (ltr) {
		return this.state.guessed.has(ltr);
	}
	/** render: render game */
	render () {
		let content, word;
		if (!this.hasWin()) {
			if (this.props.maxWrong > this.state.nWrong) {
				content = (
					<AlphaButtons
						offset="A-Z"
						btnClassName="Hangman-letter-btn"
						guess={this.guess}
						isDisabled={this.isDisabled}
					/>
				);
				word = this.guessedWord();
			} else {
				content = <p className="Hangman-label">YOU LOSE!</p>;
				word = this.state.answer;
			}
		} else {
			content = <p className="Hangman-label">YOU WIN!</p>;
		}
		return (
			<div className="Hangman">
				<h1>Hangman</h1>
				<img
					src={this.props.images[this.state.nWrong]}
					alt={`${this.state.nWrong}/${this.props.maxWrong} wrong guesses`}
				/>
				<p className="Hangman-nWrong">Number wrong: {this.state.nWrong}</p>
				<p className="Hangman-word">{word}</p>
				{content}
				{(this.state.nWrong === this.props.maxWrong || this.hasWin()) && (
					<button
						className="Hangman-restart-btn"
						type="button"
						onClick={this.handleRestart}>
						Play again!
					</button>
				)}
			</div>
		);
	}
}

export default Hangman;
