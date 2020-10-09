
const screenBlock = document.querySelector('.screen__canvas')
const screen = document.querySelector('#screen-canvas')
const controlBtns = document.querySelectorAll('.controlBtn')
const routeHud = document.querySelector('#screen__route')
const hideMouse = document.querySelector('.hideMouse')

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

	let speedPlayer = 0.05;
	let sensityPlayer = 0.09;

	let lock = false;
	let mouse = { x : parseInt(getComputedStyle(screenBlock).width)/2, y : parseInt(getComputedStyle(screenBlock).height)/2 };

	let collideTuoch = false;
	let collisionArrey = {}
	let collisionEl = 0

	let lmove = 0.1

	let scene = new THREE.Scene();

	let renderer = new THREE.WebGLRenderer( { canvas: screen } );
	renderer.setClearColor( 0x110012, 1 );
	renderer.shadowMapEnabled = true;
	renderer.setSize( parseInt(getComputedStyle(screenBlock).width), parseInt(getComputedStyle(screenBlock).height));

	let camera = new THREE.PerspectiveCamera( 65, parseInt(getComputedStyle(screenBlock).width) / parseInt(getComputedStyle(screenBlock).height), 0.1, 1000 );
	camera.position.set(-2,0,5)

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
	let material = new THREE.MeshLambertMaterial( { map: textureLoader.load('img/testWall.jpg') /*, wireframe: true*/ } );
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

	let cube = new THREE.Mesh( geometry, material );
	cube.position.set(-2,2,-2);
	cube.castShadow = true
	cube.receiveShadow = true
	scene.add(cube);

	let gridFloor = new THREE.GridHelper(100, 50, 0xee00ff, 0xee00ff)
	gridFloor.position.set(0,-0.5,0)
	scene.add( gridFloor );

	
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


	console.log(collisionArrey)
	for (var i = collisionArrey.length - 1; i >= 0; i--) {
		collisionArrey[i]
	}
	

	function collision() {

		if (camera.position.x > 5) collideTuoch = true
		else collideTuoch = false
		
	}
	
	
	controlBtns.forEach( item => {
		item.addEventListener('mousedown', () => {
			let move = item.getAttribute('data')
			if (move === 'right') PressRight = speedPlayer;
			else if (move === 'left') PressLeft = speedPlayer;
			else if (move === 'up') PressForward = speedPlayer;
			else if (move === 'down') PressBack = speedPlayer;
			else if (move === 'turnLeft') turnLeft = sensityPlayer;
			else if (move === 'turnRight') turnRight = sensityPlayer;
		})
	})
	controlBtns.forEach( item => {
		item.addEventListener('mouseup', () => {
			PressBack = PressForward = PressLeft = PressRight = PressUp = turnLeft = turnRight = 0;
		})
	})


	document.addEventListener('keydown', function(event) {
		if (event.code == 'KeyW' || event.code == 'ArrowUp') {
			PressForward = speedPlayer;
			//camera.position.x -= Math.sin(camera.rotation.y) *speedPlayer
			//camera.position.z -= Math.cos(camera.rotation.y) *speedPlayer
		}
		else if (event.code == 'KeyS' || event.code == 'ArrowDown') PressBack = speedPlayer;
		else if (event.code == 'KeyD' || event.code == 'ArrowRight') PressRight = speedPlayer;
		else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressLeft = speedPlayer;
		//else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressUp = speedPlayer;
		else if (event.code == 'KeyQ') turnLeft = sensityPlayer;
		else if (event.code == 'KeyE') turnRight = sensityPlayer;
	});
	document.addEventListener('keyup', function(event) {
		if (event.code == 'KeyW' || event.code == 'ArrowUp') PressForward = 0
		else if (event.code == 'KeyS' || event.code == 'ArrowDown') PressBack = 0
		else if (event.code == 'KeyD' || event.code == 'ArrowRight') PressRight = 0;
		else if (event.code == 'KeyA' || event.code == 'ArrowLeft') PressLeft = 0;
		else if (event.code == 'KeyQ') turnLeft = 0;
		else if (event.code == 'KeyE') turnRight = 0;
	});


	document.addEventListener('mousemove', (e)=>{
		if (lock) {
			const movementX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
			const movementY = e.movementY || e.mozMovementY || e.webkitMovementY || 0;
			const my = movementX * Math.PI / 180;
			//const mx = movementY * Math.PI / 180;
			camera.rotation.y -= my;
		}
	}, true)
	document.addEventListener("pointerlockchange", (event)=>{
		lock = !lock;
	});
	hideMouse.onclick = function(){
		if (!lock) {
			hideMouse.requestPointerLock();
		}
	};
	
	let animate = function () {
		collision()

		requestAnimationFrame( animate );
		deg = 180/Math.PI*camera.rotation.y
		if (deg >= 360 || deg <= -360) camera.rotation.y = 0
		
		let dx =   (PressRight - PressLeft)*Math.cos(camera.rotation.y) - (PressForward - PressBack)*Math.sin(camera.rotation.y);
		let dz =   - (PressForward - PressBack)*Math.cos(camera.rotation.y) - (PressRight - PressLeft)*Math.sin(camera.rotation.y);
		let ry = (turnLeft - turnRight)

		if (collideTuoch) {
			dx = -dx;
			dz = -dz;
		}
		
		camera.position.x += dx;
		camera.position.z += dz;
		

		camera.rotation.y += ry;

		if (light1.position.x >= 5)lmove = -0.01
		if (light1.position.x <= -5)lmove = 0.01

		light1.position.x += lmove
		lamp.position.x += lmove

		cube.rotation.x += 0.01;
		cube.rotation.y += 0.01;

		printRouteHud(camera.position.x,camera.position.z, deg, lock, mouse, dx, dz)
		renderer.render( scene, camera );
	};
	
	animate();

}

function printRouteHud(x,z,rotY,ml,m_center,dx,dz){
	x = Math.round(x);
	z = Math.round(z);
	rotY = Math.round(rotY);
	routeHud.innerText = `x:${x}|mouse_lock:${ml}
	z:${z}|rotY:${rotY}
	dx:${dx};dz:${dz}
	screen_center: ${m_center['x']} x ${m_center['y']}
	`
}

init()
 