import '../styles/compileds/App.css';
import { Switch, Route, NavLink } from 'react-router-dom';
import Hangman from './Hangman';
import NewGame from './NewGame';

const App = () => (
	<div className="App">
		<NavLink exact to="/games/new">
			New Game
		</NavLink>
		<Switch>
			<Route path="/games/new" component={NewGame} />
			<Route path="/games/:id" component={props => <Hangman {...props} />} />
			<Route path="/*" component={NewGame} />
		</Switch>
	</div>
);

export default App;
