import React, { Component } from 'react';
import '../styles/compileds/GameForm.css';
import { createGame } from '../helpers/api';

const APP_URL = 'http://localhost:3000';

class GameForm extends Component {
	static defaultProps = {
		defaultAttempts : 6,
		maxAttempts     : 100,
		minAttempts     : 1
	};

	constructor (props) {
		super(props);
		const { defaultAttempts } = this.props;
		this.state = {
			form     : { word: '', attempts: defaultAttempts },
			error    : null,
			gameLink : null
		};
	}

	getValue (value) {
		const { maxAttempts, minAttempts } = this.props;
		if (value > maxAttempts) {
			return maxAttempts;
		} else if (value < minAttempts) {
			return minAttempts;
		} else {
			return value;
		}
	}

	updateFormState (field, value) {
		this.setState(s => ({
			...s,
			form : { ...s.form, [field]: value }
		}));
	}

	handleChange = e => {
		e.preventDefault();
		let { name, value } = e.target;
		let isAlphaRxp = new RegExp(/[a-z]+/gi);
		value = name === 'attempts' ? +value : value;
		if (name === 'attempts') {
			value = this.getValue(value);
			this.updateFormState(name, value);
		} else {
			value = value.toLowerCase();
			value = value.replace(/\s+/g, '');
			if (!value.length || isAlphaRxp.test(value)) {
				this.updateFormState(name, value);
			}
		}
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { defaultAttempts } = this.props;
		const { word, attempts } = this.state.form;
		if (!!word && attempts) {
			let game = await createGame({ word, attempts });
			this.setState({ gameLink: `${APP_URL}/${game._id}` });
		} else {
			let fieldName = !word ? 'word' : 'attempts';
			let fieldValue = !word ? '' : defaultAttempts;
			this.setState(s => ({
				...s,
				error : `Missing ${fieldName}!`,
				form  : { ...s.form, [fieldName]: fieldValue }
			}));
		}
	};

	render () {
		const { form, error, gameLink } = this.state;
		return (
			<div>
				{gameLink && (
					<div>
						<h1>{gameLink}</h1>
						<button type="button">COPY</button>
					</div>
				)}
				{!gameLink && (
					<form className="GameForm" onSubmit={this.handleSubmit}>
						<h1>Create new hangman</h1>
						{!!error && <p className="GameForm-error-alert">{error}</p>}
						<input
							className="GameForm-input"
							type="text"
							placeholder="Word"
							name="word"
							value={form.word}
							onChange={this.handleChange}
						/>
						<input
							className="GameForm-input"
							type="number"
							placeholder="Attempts"
							name="attempts"
							value={form.attempts}
							onChange={this.handleChange}
						/>
						<button className="GameForm-button" type="submit">
							Create Game!
						</button>
					</form>
				)}
			</div>
		);
	}
}

export default GameForm;
