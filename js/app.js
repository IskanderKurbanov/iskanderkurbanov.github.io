console.log('Made by\n Iskander Kurbanov\n\nLinks: \n- https://linktr.ee/iskanderkurbanov')

const infoLists = document.querySelectorAll('.list')
const app = document.querySelectorAll('.app__skill-box')
app.forEach(el=>el.style.display ="none")

// weather urls
const localUrl = 'http://localhost:5000/w/'
const worldUrl = 'https://knd-logs.herokuapp.com/w/'

// porfolio data urls
const URL = 'https://knd-logs.herokuapp.com/webp'

const loadBar = document.createElement('div')
const loadBarPortfolio = document.createElement('div')
loadBar.className = "loadBar"
loadBarPortfolio.className = "loadBar"
document.querySelector(".app__skill-blocks").append(loadBar)
//document.querySelector(".portfolio").append(loadBarPortfolio)

function loadContentDone() {
  loadBar.remove()
  app.forEach(el=>el.style.display ="")
}

function sendRequest(method='GET', url) {
  return fetch(url).then(response => response.json())
}

function parseData(data){
  infoLists.forEach( element => {
    const dataInfoLists = element.getAttribute('data')
    let content = data.map(item=>dataInfoLists===item.dir?`<li>${item.text}</li>`:null).filter(el=>el)

    element.innerHTML = content.length>0 ? content.join('') : '...'
    
  });
}

sendRequest('GET', URL)
  .then(data => {
    parseData(data)
    loadContentDone()
  })



// Easter Egg {amount: 2}

function weatherElement() {
  document.querySelector(".weather_hiden").innerHTML = '<input type="" name="" class="weatherInput" placeholder="write your city">'
  document.querySelector('.weatherInput').addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
          sendRequest('GET', `${worldUrl}${document.querySelector('.weatherInput').value}`)
            .then(data => new WeatherApplet(data))
          document.querySelector('.weatherInput').value = ''
      }
  })
}
document.querySelector(".weather_hiden").addEventListener("dblclick",()=>weatherElement())
document.querySelector(".weather_hiden").addEventListener('touchend', ()=>weatherElement())



invColor = ['0','1']
let i=1
document.querySelector(".invert").addEventListener("click",()=>{
  invertBackground()
})
function invertBackground() {
  app__qrcode = document.querySelector('.app__qrcode')
  document.querySelector("html").style.cssText=`filter: invert(${invColor[i]});transition:all .5s ease;`
  i==0?app__qrcode.style.cssText="transition:all .5s ease;":app__qrcode.style.cssText="display:none;transition:all .5s ease;"
  if (i == invColor.length -1) i = 0
  else i++
}

let probability = Math.random();

if (probability < 0.01) {
  document.querySelector(".invert").innerHTML = '_'
  document.querySelector(".invert").style.cssText = 'animation: opacity-normal 1.5s infinite ease'
  invertBackground()
}
else if (probability < 0.05) 
  document.querySelector('.thanks').innerHTML = '<a href="https://iskanderius.design/tbtr/">some sketches BYVEEEEEEE.</a>'

