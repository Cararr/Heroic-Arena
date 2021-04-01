import React, { useState } from 'react';
import DataContainer from '../DataContainer/DataContainer';
import './AdminPanel.css';
import PropTypes from 'prop-types';

export default function AdminPanel(props) {
	const [world, setWorld] = useState({
		selected: null,
		createNewOn: false,
		databaseResponse: null,
	});

	const [hero, setHero] = useState({
		selected: null,
		createNewOn: false,
		databaseResponse: null,
	});

	const addInstance = async (type, obejctToAdd) => {
		const databaseResponse = await props.addInstance(type, obejctToAdd);
		if (type === 'world') {
			setWorld((prev) => ({ ...prev, createNewOn: false, databaseResponse }));
		} else if (type === 'hero') {
			setHero((prev) => ({ ...prev, createNewOn: false, databaseResponse }));
		}
	};

	const updateInstance = async (type, updatedObjectData) => {
		const updatedInstance = {
			...updatedObjectData,
			id:
				(type === 'world' && world.selected.id) ||
				(type === 'hero' && hero.selected.id),
		};
		const databaseResponse = await props.updateInstance(type, updatedInstance);
		if (type === 'world') {
			setWorld((prev) => ({ ...prev, selected: false, databaseResponse }));
		} else if (type === 'hero') {
			setHero((prev) => ({ ...prev, selected: false, databaseResponse }));
		}
	};

	const deleteInstance = async (type) => {
		if (type === 'world') {
			const databaseResponse = await props.deleteInstance(type, world.selected);
			setWorld((prev) => ({ ...prev, selected: null, databaseResponse }));
		} else if (type === 'hero') {
			const databaseResponse = await props.deleteInstance(type, hero.selected);
			setHero((prev) => ({ ...prev, selected: null, databaseResponse }));
		}
	};

	const selectWorld = (world) =>
		setWorld({
			selected: world,
			createNewOn: false,
			databaseResponse: null,
		});

	const worldCreatorOpenClose = () =>
		setWorld((prev) => ({
			selected: null,
			createNewOn: !prev.createNewOn,
			databaseResponse: null,
		}));

	const selectHero = (hero) =>
		setHero({
			selected: hero,
			createNewOn: false,
			databaseResponse: null,
		});

	const heroCreatorOpenClose = () =>
		setHero((prev) => ({
			selected: null,
			createNewOn: !prev.createNewOn,
			databaseResponse: null,
		}));

	return (
		<div className="admin-panel">
			<header>
				<button onClick={props.logOut}>Log out</button>
				<h1>Manage Heroic Arena's Database</h1>
				<button onClick={props.startGame}>Start game</button>
			</header>
			<DataContainer
				selectWorld={selectWorld}
				isCreateWorldOn={world.createNewOn}
				worldCreatorOpenClose={worldCreatorOpenClose}
				selectedWorld={world.selected}
				worldResponse={world.databaseResponse}
				worlds={props.worlds}
				addInstance={addInstance}
				updateInstance={updateInstance}
				deleteInstance={deleteInstance}
			/>
			<DataContainer
				selectHero={selectHero}
				isCreateHeroOn={hero.createNewOn}
				heroCreatorOpenClose={heroCreatorOpenClose}
				selectedHero={hero.selected}
				heroResponse={hero.databaseResponse}
				heroes={props.heroes}
				worldsList={props.worlds}
				addInstance={addInstance}
				updateInstance={updateInstance}
				deleteInstance={deleteInstance}
			/>
		</div>
	);
}

AdminPanel.propTypes = {
	addInstance: PropTypes.func.isRequired,
	updateInstance: PropTypes.func.isRequired,
	deleteInstance: PropTypes.func.isRequired,
	startGame: PropTypes.func.isRequired,
	logOut: PropTypes.func.isRequired,
	heroes: PropTypes.array.isRequired,
	worlds: PropTypes.array.isRequired,
};
