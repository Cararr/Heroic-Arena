import './ChoosePlayersNumber.css';
import React from 'react';
import PropTypes from 'prop-types';

export default class ChoosePlayersNumber extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			howManyPlayers: 0,
		};
	}

	handleClick = (e) =>
		this.setState({ howManyPlayers: Number(e.target.value) });

	render() {
		return (
			<div className="panel">
				<header>
					<h1>How many players will play?</h1>
				</header>
				<form>
					<label htmlFor="two">
						<input
							onClick={this.handleClick}
							id="two"
							name="players-number"
							type="radio"
							value="2"
						></input>
						Two
					</label>
					<label htmlFor="three">
						<input
							onClick={this.handleClick}
							id="three"
							name="players-number"
							type="radio"
							value="3"
						></input>
						Three
					</label>
					<label htmlFor="four">
						<input
							onClick={this.handleClick}
							id="four"
							name="players-number"
							type="radio"
							value="4"
						></input>
						Four
					</label>
					<div className="test">
						<button
							className="players-number-button"
							onClick={() => this.props.onClick(this.state.howManyPlayers)}
							type="button"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		);
	}
}

ChoosePlayersNumber.propTypes = {
	onClick: PropTypes.func.isRequired,
};
