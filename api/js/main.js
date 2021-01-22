
const URL = 'https://api.nasa.gov/planetary/apod?api_key=zsEArWGzZwrMvvcHyyco2RcWCvgd3lNSOkZLXEGc'

/*
function sendRequest(method='GET', url) {
	return fetch(url).then(response => response.json())
}
sendRequest('GET', URL)
  .then(data => console.log(data))
*/

const App = {
  data() {
    return {
    	apiData: '',
    	imgSrc: '',
    	imgTitle: '',
    	imgDescription: '',
    	hdImgSrc: '',

    }
  },
  methods: {
  	sendRequest(url) {
  		return fetch(url)
  		  .then(response => response.json())
  		  .then(data => {
  		  	this.apiData = data
  		  	this.imgTitle = data.title
  		  	this.imgSrc = data.url
  		  	this.imgDescription = data.explanation
  		  	this.hdImgSrc = data.hdurl
  		  })
  	}
  },
  mounted() {
  	this.sendRequest(URL)
  }
}

Vue.createApp(App).mount('#app')