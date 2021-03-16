import React, { Component } from 'react';
import LoginPanel from '../LoginPanel/LoginPanel';
import './WelcomePage.css';

export default class WelcomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loginOn: false,
		};
	}

	cancelLogin = () => this.setState({ loginOn: false });

	openLogin = () => this.setState({ loginOn: true });

	render() {
		return (
			<div className="welcome-page">
				{this.state.loginOn && (
					<LoginPanel
						submitLogin={this.props.submitLogin}
						cancelLogin={this.cancelLogin}
					/>
				)}
				<h1>Welcome to Heroic Arena!</h1>
				<h2>Are you ready to start?!</h2>
				<div className="welcome-page-buttons">
					<button
						onClick={this.props.startGame}
						className="welcome-page-button start-game-btn"
					>
						<img
							alt="sword and axe"
							src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b6201bd1-a04f-4177-b659-aa0bf31bfe14/d7iv78y-e8f42d74-4742-420b-8306-4365022af85b.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3sicGF0aCI6IlwvZlwvYjYyMDFiZDEtYTA0Zi00MTc3LWI2NTktYWEwYmYzMWJmZTE0XC9kN2l2Nzh5LWU4ZjQyZDc0LTQ3NDItNDIwYi04MzA2LTQzNjUwMjJhZjg1Yi5wbmcifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6ZmlsZS5kb3dubG9hZCJdfQ.nfAjmvKe7Vfak42wshRMyR7JbBV0ADMzhPkGivXdXcc"
						></img>
					</button>
					<button
						onClick={
							this.props.isUserAuthorized
								? this.props.enterAdmin
								: this.openLogin
						}
						className="welcome-page-button manage-database-btn"
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
}
