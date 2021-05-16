window.addEventListener('load', ()=>{
	const paint = document.querySelector('.paintTest')

	const canvas = paint.querySelector("#canvas")
	const cntx = canvas.getContext('2d')
	// resizing
	canvas.height = 450
	canvas.width =  450

	let painting = false
	let color = 'black'

	clearCanvas()

	function startPosition(e){
		painting = true
		draw(e)
	}

	function endPosition(){
		painting = false
		cntx.beginPath()
	}

	function draw(e){
		if(!painting) return

		cntx.lineWidth = paint.querySelector('.pointerSize').value
		cntx.lineCap = 'round'
		cntx.strokeStyle = paint.querySelector('.colorPicker2').value

		cntx.lineTo(e.layerX, e.layerY)
		cntx.stroke()

		cntx.beginPath()
		cntx.moveTo(e.layerX, e.layerY)
	}

	paint.querySelector('.clear').addEventListener('click', ()=>clearCanvas())
	paint.querySelector('.save').addEventListener('click', ()=>saveTest())

	paint.querySelectorAll('.color').forEach(i=>{
		i.addEventListener('click', ()=>{
			clearColorTool()
			color = i.getAttribute('data')
			i.style.cssText = 'border:1px solid #000;'
		})
	})

	canvas.addEventListener('pointerdown', startPosition)
	canvas.addEventListener('pointerup', endPosition)
	canvas.addEventListener('pointermove', draw)

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

	function clearColorTool(i){
		paint.querySelectorAll('.color').forEach(i=>{
			i.style.cssText = 'border:0px'
		})
	}
})