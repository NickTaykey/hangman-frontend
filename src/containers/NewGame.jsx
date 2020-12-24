import React, { Component } from 'react';
import GameClipBoard from '../components/GameClipBoard';
import GameForm from '../components/GameForm';

const APP_URL = 'https://hanggame-backend.herokuapp.com';

class NewGame extends Component {
	state = { gameLink: null };

	setGameLink = gameId => {
		let gameLink = `${APP_URL}/games/${gameId}`;
		this.setState({ gameLink });
	};

	render () {
		const { gameLink } = this.state;
		return (
			<div className="NewGame">
				{gameLink && <GameClipBoard gameLink={gameLink} />}
				{!gameLink && <GameForm setGameLink={this.setGameLink} />}
			</div>
		);
	}
}

export default NewGame;
