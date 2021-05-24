import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import Autocomplete from '@trevoreyre/autocomplete-vue'
import '@trevoreyre/autocomplete-vue/dist/style.css'
 
Vue.use(Autocomplete)

new Vue({
  render: h => h(App),
}).$mount('#app')


