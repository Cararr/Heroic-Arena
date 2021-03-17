import React, { Component } from 'react';
import './LoginPanel.css';
import PropTypes from 'prop-types';

export default class LoginPanel extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentLoginValue: '',
		};
	}

	handleInputChange = (e) =>
		this.setState({ currentLoginValue: e.target.value });

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

LoginPanel.propTypes = {
	submitLogin: PropTypes.func.isRequired,
	cancelLogin: PropTypes.func.isRequired,
};
