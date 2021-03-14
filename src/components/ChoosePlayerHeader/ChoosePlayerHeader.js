import './ChoosePlayerHeader.css';
export default function ChoosePlayerHeader(props) {
	return (
		<h1 className="choose-player-header">
			Player {props.turn} - choose your hero!
		</h1>
	);
}
