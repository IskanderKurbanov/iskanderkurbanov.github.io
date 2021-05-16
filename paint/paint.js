window.addEventListener('load', ()=>{

	const paint = document.querySelector('.paintTest')
	const canvas = paint.querySelector("#canvas")
	const cntx = canvas.getContext('2d')
	
	let painting = false
	let color = 'black'

	// resizing
	canvas.height = 450
	canvas.width =  450

	// FUNCS

	// func for painting
	function startPosition(e){
		painting = true
		draw(e)
	}

	// func for painting
	function endPosition(){
		painting = false
		cntx.beginPath()
	}

	// func for painting
	function draw(e){
		if(!painting) return

		cntx.lineWidth = paint.querySelector('.pointerSize').value
		cntx.lineCap = 'round'
		cntx.strokeStyle = paint.querySelector('.colorPicker').value

		cntx.lineTo(e.layerX, e.layerY)
		cntx.stroke()
		cntx.beginPath()
		cntx.moveTo(e.layerX, e.layerY)
	}
/*
	function resizeCanvas(data){
		let w2, h2
		if(data=='minus') w2= canvas.width*2, h2= canvas.height*2;
		else w2= canvas.width/2, h2= canvas.height/2;
		canvas.width= w2;
		canvas.height= h2;
	}
*/
	function saveTest(){
		let dataURL = canvas.toDataURL("image/png");
		let newTab = window.open('about:blank','image from canvas');
		newTab.document.write("<img src='" + dataURL + "' alt='from canvas'/>");
	}

	function clearCanvas(){
		cntx.clearRect(0, 0, canvas.width, canvas.height);

		cntx.fillStyle = 'white'
		cntx.fillRect(0,0,canvas.width, canvas.height)
	}
/*
	paint.querySelectorAll('.scaleCanvas').forEach(i=>{
		i.addEventListener('click', ()=>{
			resizeCanvas(i.getAttribute('data'))
		})
	})
*/
	paint.querySelector('.pointerSize').oninput = ()=>paint.querySelector('.sizeLable').innerHTML = paint.querySelector('.pointerSize').value
	paint.querySelector('.clear').addEventListener('click', clearCanvas)
	paint.querySelector('.save').addEventListener('click', saveTest)

	canvas.addEventListener('pointerdown', startPosition)
	canvas.addEventListener('pointerup', endPosition)
	canvas.addEventListener('pointermove', draw)

	clearCanvas()
})