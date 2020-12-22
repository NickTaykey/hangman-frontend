import '../styles/compileds/App.css';
import { Switch, Route } from 'react-router-dom';
import Hangman from './Hangman';

const App = () => (
	<div className="App">
		<Switch>
			<Route
				exact
				path="/games/:id"
				component={props => <Hangman {...props} />}
			/>
		</Switch>
	</div>
);

export default App;
