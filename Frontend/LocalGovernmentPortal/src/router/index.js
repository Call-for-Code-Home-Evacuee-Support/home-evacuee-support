import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
//import Requests from '../views/Requests.vue'
//import Supplies from '../views/Supplies.vue'
import Deliveries from '../views/Deliveries.vue'
//import Users from '../views/Users.vue'
import DeliveriesMap from "@/components/DeliveriesMap"
import Confirmation from "@/components/InputPhoneNumber"
import UserDistribution from "@/components/UserDistributionTable"

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'DeliveriesMap',
    component: DeliveriesMap
  },
  {
    path: '/distributions',
    name: 'Distributions',
    component: Deliveries
  },
  {
    path: '/confirmation',
    name: 'Confirmation',
    component: Confirmation
  },
  { 
    path: '/users/:id',
    name: 'UserDistribution',
    component: UserDistribution 
  }
]

const router = new VueRouter({
  routes
})

export default router
