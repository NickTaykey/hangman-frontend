import React, { Component } from 'react';
import '../styles/compileds/GameClipBoard.min.css';

class GameClipBoard extends Component {
	state = { copyBtnText: 'CLICK COPY!' };

	handleClick = e => {
		e.preventDefault();
		const { gameLink } = this.props;
		navigator.clipboard.writeText(gameLink).then(() => {
			this.setState({ copyBtnText: 'COPIED!' });
		});
	};

	render () {
		const { gameLink } = this.props;
		const { copyBtnText } = this.state;
		return (
			<div className="GameClipBoard">
				<h1>{gameLink}</h1>
				<button type="button" onClick={this.handleClick}>
					{copyBtnText}
				</button>
			</div>
		);
	}
}

export default GameClipBoard;
