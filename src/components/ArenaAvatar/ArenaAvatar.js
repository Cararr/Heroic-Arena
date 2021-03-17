import React from 'react';
import './ArenaAvatar.css';
import PropTypes from 'prop-types';

export default class ArenaAvatar extends React.Component {
	render() {
		return (
			<div className="avatar">
				<img
					alt={this.props.hero.name}
					src={`${this.props.hero.avatarImage}`}
				></img>
			</div>
		);
	}
}

ArenaAvatar.propTypes = {
	hero: PropTypes.object.isRequired,
};
