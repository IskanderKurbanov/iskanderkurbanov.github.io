
const URL = 'https://api.nasa.gov/planetary/apod?api_key=zsEArWGzZwrMvvcHyyco2RcWCvgd3lNSOkZLXEGc'

function sendRequest(method='GET', url) {
	return fetch(url).then(response => response.json())
}
sendRequest('GET', URL)
  .then(data => console.log(data))