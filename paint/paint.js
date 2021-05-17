window.addEventListener('load', ()=>{

	const paint = document.querySelector('.paintTest')
	const canvas = paint.querySelector("#canvas")
	const cntx = canvas.getContext('2d')
	
	let painting = false
	let color = 'black'
	let colorArray = ['#000000', '#ffffff']

	editColorArray('#fcba03')

	// resizing
	canvas.height = window.innerHeight - 50
	canvas.width = window.innerWidth/2 - 10

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

	function editColorArray(color){
		if(!colorArray.includes(color)){
			if(colorArray.length <= 3)
				colorArray.unshift(color)
			else {
				colorArray.pop()
				colorArray.unshift(color)
			}
			
			let cA = ''
			colorArray.forEach(color=>cA += `<div class="colorBlockArr" style="background:${color};" data="${color}"></div>`)
			paint.querySelector('.colorPickerArr').innerHTML = cA
		}
	}

	paint.querySelector('.colorPickerArr').addEventListener('pointerover', ()=>{
		paint.querySelectorAll('.colorBlockArr').forEach(i=>{
			i.addEventListener('click', ()=>{
				paint.querySelector('.colorPicker').value = i.getAttribute('data')
			})
		})
	})

	paint.querySelector('.pointerSize').oninput = ()=>paint.querySelector('.sizeLable').innerHTML = paint.querySelector('.pointerSize').value
	paint.querySelector('.clear').addEventListener('click', clearCanvas)
	paint.querySelector('.save').addEventListener('click', saveTest)

	canvas.addEventListener('pointerdown', startPosition)
	canvas.addEventListener('pointerup', ()=>{
		endPosition()
		editColorArray(paint.querySelector('.colorPicker').value)
	})
	canvas.addEventListener('pointermove', draw)
	canvas.addEventListener('pointerout', endPosition)

	clearCanvas()

})


url = 'https://knd-logs.herokuapp.com/art'
function sendRequest(method='GET', url) {
  return fetch(url).then(response => response.json())
}

function create_comp(data) {
	const paint = document.querySelector('.paintTest')
	paint.querySelector('#originalPaint').innerHTML = `<aside class="originPicBlock">
														<img src="${data.img}">
														<p>
															<a target="_blank" href="${data.artist.wikidata}">${data.artist.name}</a>.
															${data.date}.
															<a target="_blank" href="${data.imgHD}">HD img</a>.
														</p>
														<button onclick="sR()">next</button>
														</aside>`
}

function sR(){
	sendRequest('GET', url).then(data=>create_comp(data))
}
sR()