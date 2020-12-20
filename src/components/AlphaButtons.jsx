import React, { Component } from 'react';

class AlphaButtons extends Component {
	constructor (props) {
		super(props);
		this.handleGuess = this.handleGuess.bind(this);
	}
	static defaultProps = {
		letters : [
			'a',
			'b',
			'c',
			'd',
			'e',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'm',
			'n',
			'o',
			'p',
			'q',
			'r',
			's',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z'
		]
	};
	getOffsetLetters () {
		let { offset, letters } = this.props;
		offset = offset.toLowerCase();
		let [
			l1,
			l2
		] = offset.split('-');
		let idx1 = letters.indexOf(l1);
		let idx2 = letters.indexOf(l2) + 1;
		return letters.slice(idx1, idx2);
	}
	handleGuess (evt) {
		let ltr = evt.target.value;
		this.props.guess(ltr);
	}
	generateButtons () {
		const btns = this.getOffsetLetters().map(ltr => (
			<button
				key={ltr}
				className={this.props.btnClassName}
				value={ltr}
				onClick={this.handleGuess}
				disabled={this.props.isDisabled(ltr)}>
				{ltr}
			</button>
		));
		return btns;
	}
	render () {
		return <p className="Hangman-btns">{this.generateButtons()}</p>;
	}
}

export default AlphaButtons;
