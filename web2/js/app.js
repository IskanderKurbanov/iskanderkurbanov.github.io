/*
Vue.component('w-nav', {
	template: '<nav><h1>IK.</h1><ul><li><a href="#" @click="CurrentObj('w_about')">
	about</a></li><li><a href="#">works</a></li><li><a href="#">links</a></li></ul></nav>'
})
*/
Vue.component('move-k', {
  template: '<div class="moveK"></div>'
})


new Vue({
  el: '#work',
  data: {
  	currentObj: 'ik'
  },
  components: {
  	about: {
  		template: '#w-about'
  	},
  	work: {
  		template: '#w-work'
  	},
  	another: {
  		template: '#w-another'
  	},
    ik: {
      template: '#w-ik'
    }
  },
  methods: {
  	switchView: function(view) {
  		this.currentObj = view
  	}
  }
})