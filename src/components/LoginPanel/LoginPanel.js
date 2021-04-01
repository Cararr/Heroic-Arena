import './LoginPanel.css';
import PropTypes from 'prop-types';

export default function LoginPanel(props) {
	const handleInputChange = ({ target }) =>
		props.registerOn
			? props.setCurrentRegisterValue((prev) => ({
					...prev,
					[target.name]: target.value,
			  }))
			: props.setCurrentLoginValue((prev) => ({
					...prev,
					[target.name]: target.value,
			  }));

	return (
		<form
			onSubmit={props.registerOn ? props.submitRegister : props.submitLogin}
			className="login-panel"
		>
			<p>{props.registerOn ? 'Register yourself' : 'Identify yourself'}</p>
			<input
				required
				minLength={3}
				onChange={handleInputChange}
				value={
					props.registerOn
						? props.currentRegisterValue.name
						: props.currentLoginValue.name
				}
				name="name"
				placeholder="Name"
				type="text"
			></input>
			<input
				required
				minLength={5}
				onChange={handleInputChange}
				value={
					props.registerOn
						? props.currentRegisterValue.password
						: props.currentLoginValue.password
				}
				name="password"
				placeholder="Password"
				type="password"
			></input>
			{props.registerOn && (
				<input
					required
					minLength={5}
					onChange={handleInputChange}
					value={props.currentRegisterValue.confirmPassword}
					name="confirmPassword"
					placeholder="Confirm password"
					type="password"
				></input>
			)}
			<div className="login-buttons">
				<button className="login-button" type="submit">
					Submit
				</button>
				{!props.registerOn && (
					<button className="login-button" onClick={props.openRegister}>
						New user
					</button>
				)}
				<button
					onClick={props.registerOn ? props.cancelRegister : props.cancelLogin}
					className="login-button"
				>
					Cancel
				</button>
			</div>
		</form>
	);
}

LoginPanel.propTypes = {
	cancelLogin: PropTypes.func.isRequired,
	currentLoginValue: PropTypes.object.isRequired,
	setCurrentLoginValue: PropTypes.func.isRequired,
	submitLogin: PropTypes.func.isRequired,
	openRegister: PropTypes.func.isRequired,
	cancelRegister: PropTypes.func.isRequired,
	setRegisterOn: PropTypes.func.isRequired,
	registerOn: PropTypes.bool.isRequired,
	currentRegisterValue: PropTypes.object.isRequired,
	setCurrentRegisterValue: PropTypes.func.isRequired,
	submitRegister: PropTypes.func.isRequired,
};
