import '../styles/compileds/App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import Hangman from './Hangman';
import GameForm from '../components/GameForm';

const App = () => (
	<div className="App">
		<NavLink exact to="/games/new">
			New Game
		</NavLink>
		<Switch>
			<Route exact path="/games/new" component={GameForm} />
			<Route
				exact
				path="/games/:id"
				component={props => <Hangman {...props} />}
			/>
		</Switch>
	</div>
);

export default App;
