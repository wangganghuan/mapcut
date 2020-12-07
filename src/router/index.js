import Vue from 'vue'
import VueRouter from 'vue-router'

let BaiduMap =()=>import('../views/Positioning/baidu.vue')
let index=()=>import('../views/index.vue')
let Table=()=>import('../views/Table/index.vue')
let home=()=>import('../views/Home.vue')
let positioning=()=>import('../views/Positioning/index.vue')
let timeData=()=>import('../views/timeData.vue')
Vue.use(VueRouter)
const routes = [
  {
    path: '/',
    name: 'index',
    redirect: "/home",
    component: index,
    children:[
      {
        path: "home",
        name: "home",
        component:home
      },
      {
        path: '/Table',
        name: 'Table',
        component:Table
      },
      {
        path: '/positioning',
        name: 'positioning',
        component:positioning
      },
      {
        path: '/timeData',
        name: 'timeData',
        component:timeData
      },
      {
        path: '/baiduMap',
        name: 'BaiduMap',
        component:BaiduMap
      },
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
