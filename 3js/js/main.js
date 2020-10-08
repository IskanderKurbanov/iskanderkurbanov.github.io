
const screenBlock = document.querySelector('.screen__canvas')
const screen = document.querySelector('#screen-canvas')
const controlBtns = document.querySelectorAll('.controlBtn')
const routeHud = document.querySelector('#screen__route')

screen.width = parseInt(getComputedStyle(screen).width)
screen.height = parseInt(getComputedStyle(screen).height)


map = [
 [1,0,0,0,0,1],
 [0,0,0,0,0,0],
 [1,0,0,0,0,1],
 [0,0,0,0,0,0],
 [1,0,0,0,0,1],
 [0,0,0,0,0,0],
 [1,0,0,0,0,1],
]

function init() {

	let PressBack = 0;
	let PressForward = 0;
	let PressLeft = 0;
	let PressRight = 0;
	let PressUp = 0;
	let turnLeft = 0;
	let turnRight = 0;

	let speedPlayer = 0.1;
	let sensityPlayer = 0.1;

	let scene = new THREE.Scene();

	let renderer = new THREE.WebGLRenderer( { canvas: screen } );
	renderer.setClearColor( 0x110012, 1 );
	renderer.shadowMapEnabled = true;
	renderer.setSize( parseInt(getComputedStyle(screenBlock).width), parseInt(getComputedStyle(screenBlock).height));

	let camera = new THREE.PerspectiveCamera( 65, parseInt(getComputedStyle(screenBlock).width) / parseInt(getComputedStyle(screenBlock).height), 0.1, 1000 );
	camera.position.z = 5

	let v = new THREE.Vector3(0,0,0);

	let SFog = new THREE.FogExp2(0xff5993, 0.0001);
	scene.fog = SFog

/*
	let loader = new THREE.GLTFLoader();
	loader.load('js/dmc/scene.gltf', (gltf)=>{
		gltf.scene.scale.set(0.012,0.012,0.012)
		gltf.scene.position.set(-4,-0.5,3)
		gltf.scene.rotation.set(0,2.3,0)
		scene.add(gltf.scene)
		renderer.render(scene, camera)
	});
*/	

	let textureLoader = new THREE.TextureLoader();
	let geometry = new THREE.BoxGeometry();
	let material = new THREE.MeshLambertMaterial( { map: textureLoader.load('img/testWall.jpg') } );
	let retroSunMaterial = new THREE.MeshBasicMaterial( { map: textureLoader.load('img/retroSun.jpg') } );
	let lampMaterial = new THREE.MeshBasicMaterial( { map: textureLoader.load('img/lamp.jpg') } );
	//let cube = new THREE.Mesh( geometry, material );

	let plane = new THREE.Mesh(new THREE.PlaneGeometry(20, 20, 0, 0), material)
	plane.rotation.x = -Math.PI/2
	plane.receiveShadow = true
	plane.position.y = -0.5
	plane.castShadow = true
	scene.add( plane );

	let retroSun = new THREE.Mesh(new THREE.PlaneGeometry(100, 100, 1, 1), retroSunMaterial)
	retroSun.position.set(0,20,-200)
	retroSun.castShadow = true
	scene.add( retroSun );


	let light1 = new THREE.PointLight(0xc4c4c4, 10);
	light1.position.set(0,2,2.5);
	light1.castShadow = true
	scene.add( light1 );
	let lamp = new THREE.Mesh( geometry, lampMaterial );
	lamp.position.set(0,2,2.5);
	scene.add( lamp );

	let gridFloor = new THREE.GridHelper(100, 20, 0xee00ff, 0xee00ff)
	gridFloor.position.set(0,-0.5,0)
	scene.add( gridFloor );

	let collisionArrey = {}
	let collisionEl = 0
	for(let i = 0; i < map.length; i++){ 
		for (let j = 0; j < map[i].length; j++){
			if (map[i][j]) {
				let cube = new THREE.Mesh( geometry, material );
				cube.position.set(i,0,j);
				cube.castShadow = true
				cube.receiveShadow = true
				scene.add(cube);
				collisionArrey[collisionEl] = {'x':i,'y':0,'z':j}
				collisionEl++
			}
		}
	}


	function collisionValidation() {
		deg = 180/Math.PI*camera.rotation.y
		for(let key in collisionArrey) {
			if (collisionArrey[key]['x'] == camera.position.x && collisionArrey[key]['z'] == camera.position.z) {
				return false
			}
		}
		return true
	}
	
	
	/*
	controlBtns.forEach( item => {
		item.addEventListener('click', () => {
			let move = item.getAttribute('data')
			if (move === 'right') {}
			else if (move === 'left') {}
			else if (move === 'up') {}
			else if (move === 'down') {}
			else if (move === 'turnLeft') {}
			else if (move === 'turnRight') {}
		})
	})*/


	document.addEventListener('keydown', function(event) {
		if (event.code == 'KeyW' || event.code == 'ArrowUp') {
			//camera.position.x -= Math.sin(camera.rotation.y) *0.1
			//camera.position.z -= Math.cos(camera.rotation.y) *0.1
			PressForward = speedPlayer;
		}
		else if (event.code == 'KeyS' || event.code == 'ArrowDown') PressBack = speedPlayer;
		else if (event.code == 'KeyD' || event.code == 'ArrowRight') PressRight = speedPlayer;
		else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressLeft = speedPlayer;
		else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressUp = speedPlayer;
		else if (event.code == 'KeyQ') turnRight = sensityPlayer;
		else if (event.code == 'KeyE') turnLeft = sensityPlayer;
	});
	document.addEventListener('keyup', function(event) {
		if (event.code == 'KeyW' || event.code == 'ArrowUp') PressForward = 0
		else if (event.code == 'KeyS' || event.code == 'ArrowDown') PressBack = 0
		else if (event.code == 'KeyD' || event.code == 'ArrowRight') PressRight = 0;
		else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressLeft = 0;
		else if (event.code == 'KeyQ') turnRight = 0;
		else if (event.code == 'KeyE') turnLeft = 0;
	});


	screen.addEventListener('mousemove', (e)=>{
		if (180/Math.PI*camera.rotation.y >= 360 || 180/Math.PI*camera.rotation.y <= -360) camera.rotation.y = 0
		const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
		const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
		const my = movementX * Math.PI / 180;
		//const mx = movementY * Math.PI / 180;
		camera.rotation.y -= my;
	}, true)

	let cube = new THREE.Mesh( geometry, material );
	cube.position.set(-2,2,-2);
	cube.castShadow = true
	cube.receiveShadow = true
	scene.add(cube);
	
	let lmove = 0.1
	let animate = function () {
		requestAnimationFrame( animate );
		deg = 180/Math.PI*camera.rotation.y

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		let dx =   (PressRight - PressLeft)*Math.cos(camera.rotation.y) - (PressForward - PressBack)*Math.sin(camera.rotation.y);
		let dz =   - (PressForward - PressBack)*Math.cos(camera.rotation.y) - (PressRight - PressLeft)*Math.sin(camera.rotation.y);
		let dy = (turnLeft - turnRight)
		//dx = Math.sin(camera.rotation.y) *PressForward
		//dz = Math.cos(camera.rotation.y) *PressForward

		camera.position.x += dx;
		camera.position.z += dz;
		camera.rotation.y -= dy;


		if (light1.position.x >= 5)lmove = -0.01
		if (light1.position.x <= -5)lmove = 0.01

		light1.position.x += lmove
		lamp.position.x += lmove
		//retroSun.position.y = lmove

		printRouteHud(camera.position.x,camera.position.z)
		renderer.render( scene, camera );
	};

	animate();

}

function printRouteHud(x,z){

	routeHud.innerText = `x:${x}|z:${z}`

	
}



init()



