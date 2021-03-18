import React, { Component } from 'react';
import DataEditorIcons from '../DataEditorIcons/DataEditorIcons';
import './HeroForm.css';
import PropTypes from 'prop-types';

export default class HeroForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentForm: {
				name: this.props.selectedHero?.name || '',
				world_id: this.props.selectedHero?.worldId || '',
				type: this.props.selectedHero?.type || '',
				power_level: this.props.selectedHero?.power || '',
				strengths: this.props.selectedHero?.strengths || '',
				weakness: this.props.selectedHero?.weakness || '',
				image_url: this.props.selectedHero?.image || '',
				arena_avatar_url: this.props.selectedHero?.avatarImage || '',
			},
		};
	}

	changeValue = (e) => {
		const currentForm = this.state.currentForm;
		currentForm[e.target.name] =
			e.target.name === 'world_id' || e.target.name === 'power_level'
				? Number(e.target.value)
				: e.target.value;
		this.setState({ currentForm });
	};

	render() {
		const worldsRadios = this.props.worlds.map((world) => (
			<label key={world.name} htmlFor={world.id}>
				<input
					onChange={this.changeValue}
					checked={this.state.currentForm.world_id === world.id}
					name="world_id"
					id={world.id}
					type="radio"
					value={world.id}
				></input>
				{world.id}
			</label>
		));
		return (
			<div>
				<form>
					<label>Name:</label>
					<input
						required
						name="name"
						value={this.state.currentForm.name}
						type="text"
						onChange={this.changeValue}
					></input>
					<label>World:</label>
					<div className="hero-form-worlds-radio">{worldsRadios}</div>
					<label>Type:</label>
					<input
						maxLength={25}
						name="type"
						value={this.state.currentForm.type}
						type="text"
						onChange={this.changeValue}
					></input>
					<label>Power:</label>
					<input
						required
						name="power_level"
						value={this.state.currentForm.power_level}
						type="number"
						min="1"
						max="100"
						onChange={this.changeValue}
					></input>
					<label>Strenghts:</label>
					<input
						name="strengths"
						value={this.state.currentForm.strengths}
						type="text"
						onChange={this.changeValue}
					></input>
					<label>Weakness:</label>
					<input
						name="weakness"
						value={this.state.currentForm.weakness}
						type="text"
						onChange={this.changeValue}
					></input>
					<label>Image:</label>
					<textarea
						required
						name="image_url"
						rows={5}
						value={this.state.currentForm.image_url}
						// @ts-ignore
						type="text"
						onChange={this.changeValue}
					></textarea>
					<label>Avatar:</label>
					<textarea
						required
						name="arena_avatar_url"
						rows={5}
						value={this.state.currentForm.arena_avatar_url}
						// @ts-ignore
						type="text"
						onChange={this.changeValue}
					></textarea>
				</form>
				<DataEditorIcons
					isCreateHeroOn={this.props.isCreateHeroOn}
					currentForm={this.state.currentForm}
					selectedHero={this.props.selectedHero}
					addInstance={this.props.addInstance}
					updateInstance={this.props.updateInstance}
					deleteInstance={this.props.deleteInstance}
				/>
			</div>
		);
	}

	componentDidUpdate(prevProps) {
		if (this.props.selectedHero !== prevProps.selectedHero)
			this.setState({
				currentForm: {
					name: this.props.selectedHero.name || '',
					world_id: this.props.selectedHero.worldId,
					type: this.props.selectedHero.type || '',
					power_level: this.props.selectedHero.power,
					strengths: this.props.selectedHero.strengths || '',
					weakness: this.props.selectedHero.weakness || '',
					image_url: this.props.selectedHero.image || '',
					arena_avatar_url: this.props.selectedHero.avatarImage || '',
				},
			});
	}
}

HeroForm.propTypes = {
	isCreateHeroOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	worlds: PropTypes.array,
	selectedHero: PropTypes.object,
};
