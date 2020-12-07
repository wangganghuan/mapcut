import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
Vue.config.productionTip = false
import L from "leaflet";
import proj4 from 'proj4'
import  proj4leaflet from'proj4leaflet'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';


Vue.use(ElementUI);

import "leaflet/dist/leaflet.css"
import '@/style/index.scss'
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
