import React, { Component } from 'react';
import '../styles/compileds/GameForm.min.css';
import { createGame } from '../helpers/api';

class GameForm extends Component {
	static defaultProps = {
		maxAttempts : 100,
		minAttempts : 6
	};

	constructor (props) {
		super(props);
		const { minAttempts } = this.props;
		this.state = {
			form  : { word: '', attempts: minAttempts },
			error : null
		};
	}

	handleChange = e => {
		e.preventDefault();
		let { name, value } = e.target;
		this.setState(s => ({
			...s,
			form : { ...s.form, [name]: value }
		}));
	};

	formValidationErrUpdate = (error, field, value) => {
		this.setState(({ form, ...s }) => ({
			...s,
			form  : { ...form, [field]: value },
			error
		}));
	};

	handleSubmit = async e => {
		e.preventDefault();
		const { maxAttempts, minAttempts, setGameLink } = this.props;
		const { formValidationErrUpdate } = this;
		let { word, attempts } = this.state.form;
		let isAlphaRxp = new RegExp(/^[a-z]+$/);
		if (!!word && !!attempts) {
			attempts = +attempts;
			if (!isAlphaRxp.test(word))
				formValidationErrUpdate('Invalid word!', 'word', '');
			else if (!attempts)
				formValidationErrUpdate('Invalid attempts!', 'attempts', '6');
			else if (attempts > maxAttempts)
				formValidationErrUpdate('Max 100 attempts!', 'attempts', '6');
			else if (attempts < minAttempts)
				formValidationErrUpdate('Min 6 attempts!', 'attempts', '6');
			else {
				let { _id } = await createGame({ word, attempts });
				setGameLink(_id);
			}
		} else {
			let fieldName = !word ? 'word' : 'attempts';
			this.setState({ error: `Missing ${fieldName}!` });
		}
	};

	render () {
		const { form, error } = this.state;
		return (
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
					type="text"
					placeholder="Attempts"
					name="attempts"
					value={form.attempts}
					onChange={this.handleChange}
				/>
				<button className="GameForm-button" type="submit">
					Create Game!
				</button>
			</form>
		);
	}
}

export default GameForm;
