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
			{
				name: 'CV',
				lk: 'https://iskanderkurbanov.github.io/cv/',
				
			}
		],
		about: {
			'web': [
				'Python',
				'Vue.js',
				'HTML, CSS',
				'SQL',
			],
			'3D': [
				'Autodesk Inventor',
				'SketchUp',
			],
			'Design': [
				'Adobe Illustrator',
			],
		}
	},
	components: {
		name:{
			template: '<h2>Iskander Kurbanov.</h2>'
		},
		description: {
			template: '<h1>Web-developer | freelancer</h1>'
		},
		portfolio : {
			template: '<h1>Feature projects. Cooming Soon. Sorry not now. </h1>'
		},
		about: {
			template: ''
		},
		linkwork: {
			template: ''
		},
		foot: {
			template: `<h5>2019-2020 Курбанов Искандер.<br>Thank you for visiting my site!</h5>`
		}
	}
})