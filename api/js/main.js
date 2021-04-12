
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
      apiContent: '',

      imgSrc: '',
      imgTitle: '...',
      imgDescription: '...',
      hdImgSrc: '',

      videoSrc: '',

      apiDate: '...',
      apiCopyright: '',
    }
  },
  methods: {
    sendRequest(url) {
      return fetch(url)
        .then(response => response.json())
        .then(data => this.printData(data))
    },
    printData(data){
    	this.apiData = data
		  this.imgTitle = data.title
		  this.imgDescription = data.explanation
		  this.apiDate = data.date
		  if (data.media_type == "image") this.apiContent = data.media_type
      data.url?this.imgSrc = data.url:this.imgSrc = ''
      if(data.hdurl)this.hdImgSrc = data.hdurl
      data.media_type=="video"? this.videoSrc = data.url : this.videoSrc = ""
		  if (data.copyright) this.apiCopyright = 'copyright: ' + data.copyright
    }
  },
  mounted() {
    this.sendRequest(URL)
  }
}

Vue.createApp(App).mount('#app')