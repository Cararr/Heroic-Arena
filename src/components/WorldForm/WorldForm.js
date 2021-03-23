import React, { useState, useEffect } from 'react';
import './WorldForm.css';
import DataEditorIcons from '../DataEditorIcons/DataEditorIcons';
import PropTypes from 'prop-types';

export default function WorldForm(props) {
	const [currentForm, setCurrentForm] = useState({
		name: props.selectedWorld?.name || '',
		world_origin: props.selectedWorld?.worldOrigin || '',
		logo_url: props.selectedWorld?.logoUrl || '',
	});

	useEffect(() => {
		setCurrentForm(() => ({
			name: props.selectedWorld?.name || '',
			world_origin: props.selectedWorld?.worldOrigin || '',
			logo_url: props.selectedWorld?.logoUrl || '',
		}));
	}, [props.selectedWorld]);

	const changeValue = ({ target }) => {
		const { name, value } = target;
		setCurrentForm((prev) => ({ ...prev, [name]: value }));
	};

	return (
		<div>
			<form>
				<label>Name:</label>
				<input
					maxLength={25}
					required
					name="name"
					onChange={changeValue}
					value={currentForm.name}
					type="text"
				></input>
				<label>Origin:</label>
				<input
					maxLength={100}
					name="world_origin"
					onChange={changeValue}
					value={currentForm.world_origin}
					type="text"
				></input>
				<label>Logo:</label>
				<textarea
					rows={5}
					name="logo_url"
					onChange={changeValue}
					value={currentForm.logo_url}
					//@ts-ignore
					type="text"
				></textarea>
			</form>
			{
				<DataEditorIcons
					isCreateWorldOn={props.isCreateWorldOn}
					currentForm={currentForm}
					selectedWorld={props.selectedWorld}
					addInstance={props.addInstance}
					updateInstance={props.updateInstance}
					deleteInstance={props.deleteInstance}
				/>
			}
		</div>
	);
}

WorldForm.propTypes = {
	isCreateWorldOn: PropTypes.bool,
	addInstance: PropTypes.func,
	updateInstance: PropTypes.func,
	deleteInstance: PropTypes.func,
	selectedWorld: PropTypes.object,
};
