import Vue from 'vue'
import App from './App'
import router from './router'
import filters from './filters.js'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import 'babel-polyfill'
import $ from 'jquery'
Vue.use(Element)

Vue.config.productionTip = false
//添加过滤器
Object.keys(filters).forEach((v, i) => {
  Vue.filter(v, filters[v]);
});
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
