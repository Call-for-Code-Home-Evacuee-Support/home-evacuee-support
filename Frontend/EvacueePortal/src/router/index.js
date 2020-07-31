import Vue from 'vue'
import VueRouter from 'vue-router'

import UserInformation from '@/components/UserInformation.vue'
import SuppliesInformation from '@/components/SuppliesInformation.vue'
import SubmitForm from '@/components/SubmitForm.vue'
import UserMap from '@/components/UserMap.vue'
import Complete from '@/components/Complete'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'UserInformation',
    component: UserInformation
  },
  {
    path: '/1',
    name: 'SuppliesInformation',
    component: SuppliesInformation
  },
  {
    path: '/2',
    name: 'SubmitForm',
    component: SubmitForm
  },
  {
    path: '/map',
    name: 'UserMap',
    component: UserMap
  },
  {
    path: '/3',
    name: 'Complete',
    component: Complete
  }
]

const router = new VueRouter({
  routes
})

export default router
