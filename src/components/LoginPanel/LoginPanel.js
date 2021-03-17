import React, { useState } from 'react';
import './LoginPanel.css';
import PropTypes from 'prop-types';

export default function LoginPanel(props) {
	const [currentLoginValue, setCurrentLoginValue] = useState('');

	const handleInputChange = (e) => setCurrentLoginValue(e.target.value);

	return (
		<div className="login-panel">
			<p>Identify yourself</p>
			<input
				onChange={handleInputChange}
				value={currentLoginValue}
				type="text"
			></input>
			<div className="login-buttons">
				<button onClick={props.cancelLogin} className="login-button">
					Cancel
				</button>
				<button
					onClick={() => props.submitLogin(currentLoginValue)}
					className="login-button"
				>
					Submit
				</button>
			</div>
		</div>
	);
}

LoginPanel.propTypes = {
	submitLogin: PropTypes.func.isRequired,
	cancelLogin: PropTypes.func.isRequired,
};
