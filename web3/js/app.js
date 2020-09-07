new Vue({
	el: '#work',
	data: {
		message: 'Hello world',
		links: [
			{
				name: 'Github',
				lk: 'https://github.com/IskanderKurbanov/',
			},
			{
				name: 'LinkedIn',
				lk: 'https://www.linkedin.com/in/kurbanov-iskander-350bb819b/',
			},
			{
				name: 'Twitter',
				lk: 'https://twitter.com/Tobias53610517',
			},
		]
	},
	components: {
		name:{
			template: '<h1>Im Iskander Kurbanov.</h1>'
		},
		description: {
			template: '<h2>Web-developer | freelancer</h2>'
		},
		linkwork: {
			template: ''
		},
		foot: {
			template: '<h5>2019-2020 Курбанов Искандер.<br> Thank you for visiting my site!</h5>'
		}
	}
})