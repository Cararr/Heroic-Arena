import React, { Component } from 'react';
import './LoginPanel.css';

export default class LoginPanel extends Component {
	constructor(props) {
		super(props);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.state = {
			currentLoginValue: '',
		};
	}

	handleInputChange(e) {
		this.setState({ currentLoginValue: e.target.value });
	}

	render() {
		return (
			<div className="login-panel">
				<p>Identify yourself</p>
				<input
					onChange={this.handleInputChange}
					value={this.state.currentLoginValue}
					type="text"
				></input>
				<div className="login-buttons">
					<button onClick={this.props.cancelLogin} className="login-button">
						Cancel
					</button>
					<button
						onClick={() => this.props.submitLogin(this.state.currentLoginValue)}
						className="login-button"
					>
						Submit
					</button>
				</div>
			</div>
		);
	}
}
