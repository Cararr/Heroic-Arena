import React, { Component } from 'react';
import './WorldForm.css';
import DataEditorIcons from '../DataEditorIcons/DataEditorIcons';
import PropTypes from 'prop-types';

export default class WorldForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			currentForm: {
				name: this.props.selectedWorld?.name || '',
				world_origin: this.props.selectedWorld?.worldOrigin || '',
				logo_url: this.props.selectedWorld?.logoUrl || '',
			},
		};
	}

	changeValue = (e) => {
		const currentForm = this.state.currentForm;
		currentForm[e.target.name] = e.target.value;
		this.setState({ currentForm });
	};

	render() {
		return (
			<div>
				<form>
					<label>Name:</label>
					<input
						maxLength={25}
						required
						name="name"
						onChange={this.changeValue}
						value={this.state.currentForm.name}
						type="text"
					></input>
					<label>Origin:</label>
					<input
						maxLength={100}
						name="world_origin"
						onChange={this.changeValue}
						value={this.state.currentForm.world_origin}
						type="text"
					></input>
					<label>Logo:</label>
					<textarea
						rows={5}
						name="logo_url"
						onChange={this.changeValue}
						value={this.state.currentForm.logo_url}
						//@ts-ignore
						type="text"
					></textarea>
				</form>
				{
					<DataEditorIcons
						isCreateWorldOn={this.props.isCreateWorldOn}
						currentForm={this.state.currentForm}
						selectedWorld={this.props.selectedWorld}
						addInstance={this.props.addInstance}
						updateInstance={this.props.updateInstance}
						deleteInstance={this.props.deleteInstance}
					/>
				}
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedWorld !== prevProps.selectedWorld) {
			this.setState({
				currentForm: {
					name: this.props.selectedWorld.name,
					world_origin: this.props.selectedWorld.worldOrigin || '',
					logo_url: this.props.selectedWorld.logoUrl || '',
				},
			});
		}
	}
}

WorldForm.propTypes = {
	isCreateWorldOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	selectedWorld: PropTypes.object,
};
