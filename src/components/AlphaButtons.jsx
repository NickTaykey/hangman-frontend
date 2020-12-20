import React, { Component } from 'react';
import { lettersArray } from '../data/helpers';

class AlphaButtons extends Component {
	handleGuess = e => {
		const { value } = e.target;
		this.props.guess(value);
	};

	generateButtons () {
		const { btnClassName, isDisabled, offset } = this.props;
		let letters = lettersArray(offset);
		let btns = letters.map(l => (
			<button
				key={l}
				className={btnClassName}
				value={l}
				onClick={this.handleGuess}
				disabled={isDisabled(l)}>
				{l}
			</button>
		));
		return btns;
	}

	render () {
		let btns = this.generateButtons();
		return <p className="Hangman-btns">{btns}</p>;
	}
}

export default AlphaButtons;
