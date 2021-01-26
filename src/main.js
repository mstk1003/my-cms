import Vue from 'vue'
import App from './App.vue'

import firebase from 'firebase'
import firebaseConfig from '../firebaseconfig.js'
import store from './store';
import router from './router'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
