import React, { useState, useEffect } from 'react';
import Game from '../Game/Game';
import AdminPanel from '../AdminPanel/AdminPanel';
import WelcomePage from '../WelcomePage/WelcomePage';
import '../../fontello/css/fontello.css';
import DB from '../../util/connectToDB';

export default function App() {
	const [loggedUser, setLoggedUser] = useState({});
	const [shouldGameBegin, setShouldGameBegin] = useState(false);
	const [shouldEnterAdminPanel, setShouldEnterAdminPanel] = useState(false);

	// Login panel states
	const [loginOn, setloginOn] = useState(false);
	const [currentLoginValue, setCurrentLoginValue] = useState({
		name: '',
		password: '',
	});
	// Register panel states
	const [registerOn, setRegisterOn] = useState(false);
	const [currentRegisterValue, setCurrentRegisterValue] = useState({
		name: '',
		password: '',
		confirmPassword: '',
	});

	const [worlds, setWorlds] = useState([]);
	const [heroes, setHeroes] = useState([]);
	useEffect(() => {
		loadObjects();
	}, []);
	// Get all worlds and heroes from DB and load them on App's 1st render
	const loadObjects = async () => {
		const worldsResponse = await DB.getWorlds();
		const loadedWorlds = worldsResponse.worlds.map((world) => ({
			id: world.id,
			name: world.name,
			worldOrigin: world.world_origin,
			logoUrl: world.logo_url,
		}));
		const heroesResponse = await DB.getHeroes();
		const loadedHeroes = heroesResponse.heroes.map((hero) => ({
			id: hero.id,
			worldId: hero.world_id,
			name: hero.name,
			type: hero.type,
			strengths: hero.strengths,
			weakness: hero.weakness,
			power: hero.power_level,
			image: hero.image_url,
			avatarImage: hero.arena_avatar_url,
		}));
		setWorlds(loadedWorlds);
		setHeroes(loadedHeroes);
	};

	const submitLogin = async (e) => {
		e.preventDefault();
		const loginResponse = await DB.logIn(currentLoginValue);
		if (loginResponse.user) {
			setLoggedUser({ name: loginResponse.user });
			setShouldEnterAdminPanel(true);
			setloginOn(false);
		} else if (loginResponse.response) alert(loginResponse.response);
		setCurrentLoginValue({
			name: '',
			password: '',
		});
	};

	const submitRegister = async (e) => {
		e.preventDefault();
		const registerResponse = await DB.register(currentRegisterValue);
		setRegisterOn(false);
		alert(registerResponse);
		setCurrentRegisterValue({
			name: '',
			password: '',
			confirmPassword: '',
		});
	};

	const logOut = () => {
		setLoggedUser({});
		setShouldEnterAdminPanel(false);
	};

	// Create new hero / world
	const addInstance = async (type, objectToAdd) => {
		const response = await DB.addToDB(type, objectToAdd);
		if (type === 'world') {
			// If response is an object that means everything went OK
			if (typeof response === 'object') {
				const createdWorld = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				setWorlds((prev) => [...prev, createdWorld]);
				return `Created world #${response.world.id}: ${response.world.name}.`;
			} // Else something went wrong and function returns DB error response
			else return response;
		} else if (type === 'hero') {
			// If response is an object that means everything went OK
			if (typeof response === 'object') {
				const createdHero = {
					id: response.hero.id,
					worldId: response.hero.world_id,
					name: response.hero.name,
					type: response.hero.type,
					strengths: response.hero.strengths,
					weakness: response.hero.weakness,
					power: response.hero.power_level,
					image: response.hero.image_url,
					avatarImage: response.hero.arena_avatar_url,
				};
				setHeroes((prev) => [...prev, createdHero]);
				return `Created hero #${response.hero.id}: ${response.hero.name}.`;
			} // Else something went wrong and function returns DB error response
			else return response;
		} else return `Wrong object type: ${type}`;
	};

	// Update hero / world
	const updateInstance = async (type, updatedObjectData) => {
		// If object is the same this message will be returned
		const noChangesMessage = `You haven't changed anything at all!`;

		if (type === 'world') {
			const worldToBeUpdated = worlds.find(
				(world) => world.id === updatedObjectData.id
			);
			if (
				worldToBeUpdated.name === updatedObjectData.name &&
				worldToBeUpdated.worldOrigin === updatedObjectData.world_origin &&
				worldToBeUpdated.logoUrl === updatedObjectData.logo_url
			)
				return noChangesMessage;
		}
		if (type === 'hero') {
			const heroToBeUpdated = heroes.find(
				(hero) => hero.id === updatedObjectData.id
			);
			if (
				heroToBeUpdated.name === updatedObjectData.name &&
				heroToBeUpdated.worldId === updatedObjectData.world_id &&
				heroToBeUpdated.type === updatedObjectData.type &&
				heroToBeUpdated.strengths === updatedObjectData.strengths &&
				heroToBeUpdated.weakness === updatedObjectData.weakness &&
				heroToBeUpdated.power === updatedObjectData.power_level &&
				heroToBeUpdated.image === updatedObjectData.image_url &&
				heroToBeUpdated.avatarImage === updatedObjectData.arena_avatar_url
			)
				return noChangesMessage;
		}

		const response = await DB.updateInDB(type, updatedObjectData);
		if (type === 'world') {
			// If response is an object that means everything went OK
			if (typeof response === 'object') {
				// Replace old world with updated one
				const updatedWorlds = worlds;
				updatedWorlds[
					updatedWorlds.findIndex((world) => world.id === response.world.id)
				] = {
					id: response.world.id,
					name: response.world.name,
					worldOrigin: response.world.world_origin,
					logoUrl: response.world.logo_url,
				};
				setWorlds(updatedWorlds);
				return `Updated world #${response.world.id}`;
			} // Else something went wrong and function returns DB error response
			else return response;
		} else if (type === 'hero') {
			// If response is an object that means everything went OK
			if (typeof response === 'object') {
				// Replace old hero with updated one
				const updatedHeroes = heroes;
				updatedHeroes[
					updatedHeroes.findIndex((hero) => hero.id === response.hero.id)
				] = {
					id: response.hero.id,
					worldId: response.hero.world_id,
					name: response.hero.name,
					type: response.hero.type,
					strengths: response.hero.strengths,
					weakness: response.hero.weakness,
					power: response.hero.power_level,
					image: response.hero.image_url,
					avatarImage: response.hero.arena_avatar_url,
				};
				setHeroes(updatedHeroes);
				return `Updated hero #${response.hero.id}`;
			} // Else something went wrong and function returns DB error response
			else return response;
		} else return `Wrong object type: ${type}`;
	};

	// Delete hero / world
	const deleteInstance = async (type, objectToDelete) => {
		const response = await DB.deleteFromDB(type, objectToDelete);
		// If everything went OK the DB will return an id of deleted instance
		if (type === 'world') {
			// Remove deleted world from loaded world list
			const worldsAfterDelete = worlds.filter((world) => world.id !== response);
			setWorlds(worldsAfterDelete);
			// If world requested to delete has supplied heroes it wont be deleted. Instead DB will return a string containing list of supplied heroes
			return typeof response === 'number'
				? `Deleted world #${response}`
				: response;
		} else if (type === 'hero') {
			// Remove deleted hero from loaded world list
			const heroesAfterDelete = heroes.filter((hero) => hero.id !== response);
			setHeroes(heroesAfterDelete);
			return `Deleted hero #${response}`;
		} else return `Wrong object type: ${type}`;
	};

	const startGame = () => setShouldGameBegin(true);

	const enterAdminPanel = () => setShouldEnterAdminPanel(true);

	const backToWelcomePage = () => {
		setShouldGameBegin(false);
		setShouldEnterAdminPanel(false);
	};

	// Start the Game if user click a 'start' button
	if (shouldGameBegin)
		return (
			<Game
				backToWelcomePage={backToWelcomePage}
				heroes={heroes}
				worlds={worlds}
			/>
		);
	// Enter the admin panel if a state allows it
	else if (shouldEnterAdminPanel) {
		return (
			<AdminPanel
				addInstance={addInstance}
				updateInstance={updateInstance}
				deleteInstance={deleteInstance}
				logOut={logOut}
				startGame={startGame}
				heroes={heroes}
				worlds={worlds}
			/>
		);
	} // Otherwise it means that the Welcome Page should be rendered
	else
		return (
			<WelcomePage
				loginOn={loginOn}
				setloginOn={setloginOn}
				currentLoginValue={currentLoginValue}
				setCurrentLoginValue={setCurrentLoginValue}
				submitLogin={submitLogin}
				registerOn={registerOn}
				setRegisterOn={setRegisterOn}
				currentRegisterValue={currentRegisterValue}
				setCurrentRegisterValue={setCurrentRegisterValue}
				submitRegister={submitRegister}
				loggedUser={loggedUser}
				enterAdmin={enterAdminPanel}
				startGame={startGame}
			/>
		);
}
