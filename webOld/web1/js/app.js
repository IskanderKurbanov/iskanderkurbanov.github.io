

const cells = document.querySelectorAll(".cell")

cells.forEach( function(item) {
	item.addEventListener("click", function(){
		let user = [];
		let userStep = item;
		let userStepTik = userStep.getAttribute("data-tab");

		user.push(userStepTik)

		for (let key in user) {
			console.log( user[key] );
		}

		console.log(user)
		userStep.classList.add('ustep');
	})
})

/*
window.addEventListener('scroll', function(){
	let position = window.scrollY;
	console.log(position);
});
*/
Vue.filter('sml',function(item){
	return item.replace("1", "✊")
				.replace("2", "✋")
				.replace("3", "✌");
});


new Vue({
	el: '#work',
	data: {
		message: 'Play',
		botChoise: '',
		links: [
			{
				name: 'Github',
				lk: 'https://github.com/IskanderKurbanov/',
				cls: '',
			},
			{
				name: 'LinkedIn',
				lk: 'https://www.linkedin.com/in/kurbanov-iskander-350bb819b/',
				cls: '',
			},
			{
				name: 'Twitter',
				lk: 'https://twitter.com/Tobias53610517',
				cls: '',
			},
			{
				name: 'CV',
				lk: 'https://iskanderkurbanov.github.io/cv/',
				cls: 'smpl__clr',
				
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
		},
		
	},
	components: {
		name:{
			template: '<h1>Iskander Kurbanov.</h1>'
		},
		description: {
			template: '<h2><span>Web-developer</span> <span>freelancer</span></h2>'
		},
		portfolio : {
			template: '<h1>...</h1>'
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
	},
	methods: {
		rockPapperScissors: function(obj) {
			let bot = Math.floor(Math.random() * (3 - 1 + 1)) + 1;
			if(bot == 1){this.botChoise = "1"}
			if(bot == 2){this.botChoise = "2"}
			if(bot == 3){this.botChoise = "3"}

			if(bot == 1 & obj == 1 || bot == 2 & obj == 2 || bot == 3 & obj == 3){
				this.message = ' draw! '
			}else if(bot == 1 & obj == 2 || bot == 2 & obj == 3 || bot == 3 & obj == 1) {
				this.message = ' you win! '
			}else{
				this.message = ' you lose! '
			}
		}
	}
});