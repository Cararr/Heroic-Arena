import LoginPanel from '../LoginPanel/LoginPanel';
import './WelcomePage.css';
import PropTypes from 'prop-types';

export default function WelcomePage(props) {
	const openLogin = () => props.setloginOn(true);
	const cancelLogin = () => {
		props.setloginOn(false);
		props.setCurrentLoginValue({
			name: '',
			password: '',
		});
	};
	const openRegister = () => {
		props.setCurrentLoginValue({
			name: '',
			password: '',
		});
		props.setRegisterOn(true);
	};
	const cancelRegister = (e) => {
		e.preventDefault();
		props.setRegisterOn(false);
		props.setCurrentRegisterValue({
			name: '',
			password: '',
			confirmPassword: '',
		});
	};

	return (
		<div className="welcome-page">
			{props.loginOn && (
				<LoginPanel
					currentLoginValue={props.currentLoginValue}
					setCurrentLoginValue={props.setCurrentLoginValue}
					submitLogin={props.submitLogin}
					cancelLogin={cancelLogin}
					openRegister={openRegister}
					cancelRegister={cancelRegister}
					registerOn={props.registerOn}
					setRegisterOn={props.setRegisterOn}
					currentRegisterValue={props.currentRegisterValue}
					setCurrentRegisterValue={props.setCurrentRegisterValue}
					submitRegister={props.submitRegister}
				/>
			)}
			<h1>Welcome to Heroic Arena!</h1>
			<h2>
				{props.loggedUser.name ? `${props.loggedUser.name}, a` : 'A'}re you
				ready?!
			</h2>
			<div className="welcome-page-buttons">
				<button
					onClick={props.startGame}
					className="welcome-page-button start-game-button"
				>
					<img
						alt="sword and axe"
						src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b6201bd1-a04f-4177-b659-aa0bf31bfe14/d7iv78y-e8f42d74-4742-420b-8306-4365022af85b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjYyMDFiZDEtYTA0Zi00MTc3LWI2NTktYWEwYmYzMWJmZTE0XC9kN2l2Nzh5LWU4ZjQyZDc0LTQ3NDItNDIwYi04MzA2LTQzNjUwMjJhZjg1Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.nfAjmvKe7Vfak42wshRMyR7JbBV0ADMzhPkGivXdXcc"
					></img>
				</button>
				<button
					onClick={props.loggedUser.name ? props.enterAdmin : openLogin}
					className="welcome-page-button manage-database-button"
				>
					<img
						alt="database"
						src="https://img.icons8.com/ios/452/database.png"
					></img>
					<p>Manage database</p>
				</button>
			</div>
		</div>
	);
}

WelcomePage.propTypes = {
	loginOn: PropTypes.bool.isRequired,
	setloginOn: PropTypes.func.isRequired,
	currentLoginValue: PropTypes.object.isRequired,
	setCurrentLoginValue: PropTypes.func.isRequired,
	submitLogin: PropTypes.func.isRequired,
	registerOn: PropTypes.bool.isRequired,
	setRegisterOn: PropTypes.func.isRequired,
	currentRegisterValue: PropTypes.object.isRequired,
	setCurrentRegisterValue: PropTypes.func.isRequired,
	submitRegister: PropTypes.func.isRequired,
	loggedUser: PropTypes.object.isRequired,
	enterAdmin: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
};
