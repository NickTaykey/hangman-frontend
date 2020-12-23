import React, { Component } from 'react';
import '../styles/compileds/GameForm.css';

class GameForm extends Component {
	render () {
		return (
			<form className="GameForm">
				<h1>Create new hangman</h1>
				<input className="GameForm-input" type="text" placeholder="Word" />
				<input
					className="GameForm-input"
					type="number"
					placeholder="Attempts"
				/>
				<button className="GameForm-button" type="submit">
					Create Game!
				</button>
			</form>
		);
	}
}

export default GameForm;
