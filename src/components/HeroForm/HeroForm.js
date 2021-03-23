import React, { useState, useEffect } from 'react';
import './HeroForm.css';
import DataEditorIcons from '../DataEditorIcons/DataEditorIcons';
import PropTypes from 'prop-types';

export default function HeroForm(props) {
	const [currentForm, setCurrentForm] = useState({
		name: props.selectedHero?.name || '',
		world_id: props.selectedHero?.worldId || '',
		type: props.selectedHero?.type || '',
		power_level: props.selectedHero?.power || '',
		strengths: props.selectedHero?.strengths || '',
		weakness: props.selectedHero?.weakness || '',
		image_url: props.selectedHero?.image || '',
		arena_avatar_url: props.selectedHero?.avatarImage || '',
	});

	useEffect(() => {
		setCurrentForm(() => ({
			name: props.selectedHero?.name || '',
			world_id: props.selectedHero?.worldId || '',
			type: props.selectedHero?.type || '',
			power_level: props.selectedHero?.power || '',
			strengths: props.selectedHero?.strengths || '',
			weakness: props.selectedHero?.weakness || '',
			image_url: props.selectedHero?.image || '',
			arena_avatar_url: props.selectedHero?.avatarImage || '',
		}));
	}, [props.selectedHero]);

	const changeValue = ({ target }) => {
		const { name, value } = target;
		setCurrentForm((prev) => ({
			...prev,
			[name]:
				name === 'world_id' || name === 'power_level' ? Number(value) : value,
		}));
	};

	const worldsRadios = props.worlds.map((world) => (
		<label key={world.name} htmlFor={world.id}>
			<input
				onChange={changeValue}
				checked={currentForm.world_id === world.id}
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
					value={currentForm.name}
					type="text"
					onChange={changeValue}
				></input>
				<label>World:</label>
				<div className="hero-form-worlds-radio">{worldsRadios}</div>
				<label>Type:</label>
				<input
					maxLength={25}
					name="type"
					value={currentForm.type}
					type="text"
					onChange={changeValue}
				></input>
				<label>Power:</label>
				<input
					required
					name="power_level"
					value={currentForm.power_level}
					type="number"
					min="1"
					max="100"
					onChange={changeValue}
				></input>
				<label>Strenghts:</label>
				<input
					name="strengths"
					value={currentForm.strengths}
					type="text"
					onChange={changeValue}
				></input>
				<label>Weakness:</label>
				<input
					name="weakness"
					value={currentForm.weakness}
					type="text"
					onChange={changeValue}
				></input>
				<label>Image:</label>
				<textarea
					required
					name="image_url"
					rows={5}
					value={currentForm.image_url}
					// @ts-ignore
					type="text"
					onChange={changeValue}
				></textarea>
				<label>Avatar:</label>
				<textarea
					required
					name="arena_avatar_url"
					rows={5}
					value={currentForm.arena_avatar_url}
					// @ts-ignore
					type="text"
					onChange={changeValue}
				></textarea>
			</form>
			<DataEditorIcons
				isCreateHeroOn={props.isCreateHeroOn}
				currentForm={currentForm}
				selectedHero={props.selectedHero}
				addInstance={props.addInstance}
				updateInstance={props.updateInstance}
				deleteInstance={props.deleteInstance}
			/>
		</div>
	);
}

HeroForm.propTypes = {
	isCreateHeroOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	worlds: PropTypes.array,
	selectedHero: PropTypes.object,
};
