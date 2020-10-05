console.log('test')



const app = document.querySelector('#app')
const ulList = app.querySelector('.list')
const titleBtcName = document.querySelectorAll('.title-btc')
const addPostBtc = document.querySelector('.addPostBtc')

let titleName = 'films'

/*
titleBtcName.forEach(item=>{
	item.addEventListener('click',()=>{
		titleName = item.getAttribute('data-title')
		if (titleName === 'todos') {
			getData('https://knd-logs.herokuapp.com/todos')
			return titleName
		} else if(titleName === 'films') {
			getData('https://knd-logs.herokuapp.com/films')
			return titleName
		}
	})
})
*/
async function getData(url) {
	fetch(url)
	.then(response=>response.json())
	.then(data=>printContent(data, appContent)())
	.then(()=>updateListData())
}

async function postData(url = '', data = {}) {
  const response = await fetch(url, { method: 'POST', mode: 'cors', cache: 'no-cache', credentials: 'same-origin', headers: 
    { 'Content-Type': 'application/json' },
    redirect: 'follow', referrerPolicy: 'no-referrer', body: data 
  })
  console.log(response)
  return await response
}

function printContent(content, fn) {
	return function(...args) {
		fn.apply(content, args)
	}
}
function appContent() {
	let arr = []
	for (let key in this) {
		if (this.hasOwnProperty(key)) { 
			arr.push(`<li>(${this[key].date}) anonim >> ${this[key].name}</li>`)
		}
	} 
	ulList.innerHTML = arr.join('')
}

function updateListData(){
	console.log('btn activ')
	const btcPost = document.querySelectorAll('.btcPost')
	btcPost.forEach((item) => {
		item.onclick = () => {
			let id = item.getAttribute('data-tab')
			postData('https://knd-logs.herokuapp.com/getdata', JSON.stringify({'id': id, 'section': titleName})).then((data) => location.reload());
		}
	})
}


addPostBtc.addEventListener('click',()=>{
	let namePost = document.querySelector('.postInp')
	const d = new Date()
	const now = d.getFullYear() + '/' + d.getMonth() + '/' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds()

	arr = { 'data': now, 'name': namePost.value, 'gen': 'text', 'section': 'person_chat' }
	console.log(arr)
	
	if (namePost.value !=='') {

		postData('https://knd-logs.herokuapp.com/getdata', JSON.stringify(arr)).then((data) => location.reload())
		namePost.value=''
	}
	
})








//getData('https://knd-logs.herokuapp.com/person_chat')
setInterval(() => {
	getData('https://knd-logs.herokuapp.com/person_chat')
	//console.log('reload...')

}, 8000);
/*
const requestPromiseGet = new Promise((resolve, reject)=>{
	fetch('https://knd-logs.herokuapp.com/films')
	.then(response=>response.json())
	.then(data=>resolve(data))
})

requestPromiseGet
.then((data)=>printContent(data, appContent)())
.then(()=>{
	const btcPost = document.querySelectorAll('.btcPost')
	btcPost.forEach((item) => {
		item.onclick = () => {
			let id = item.getAttribute('data-tab')
			postData('https://knd-logs.herokuapp.com/films', { 'id': id })
			  .then((data) => location.reload());
		}
	})
})
.catch(err=>console.error(err))
*/



