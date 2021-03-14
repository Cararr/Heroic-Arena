export default function animateArena() {
	move(1);
	move(2);
}

function move(whichOne) {
	const canvas = document.querySelector('#test');
	const ctx = canvas.getContext('2d');
	const entrance_position = {
		x: 160,
		y: 30,
	};
	const directions = {
		xd: 0,
		yd: 0,
	};
	let color;
	switch (whichOne) {
		case 1:
			color = 'red';
			directions.xd = 0.2;
			directions.yd = 0.2;
			break;
		case 2:
			color = 'blue';
			directions.xd = 0.4;
			directions.yd = 0.2;
			break;
		default:
			console.log('canvas bug');
	}

	update();

	function update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		draw();
		entrance_position.x += directions.xd;
		entrance_position.y += directions.yd;
		if (entrance_position.x > 230) return;
		requestAnimationFrame(update);
	}
	function draw() {
		ctx.fillStyle = color;
		ctx.fillRect(entrance_position.x, entrance_position.y, 10, 10);
	}
}
