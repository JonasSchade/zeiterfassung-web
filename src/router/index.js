import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import administration from '@/components/administration'
import mitarbeiter from '@/components/mitarbeiter'
import projekte from '@/components/projekte'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      path: '*',
      component: {
          template: '<p>Page Not Found</p>'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/administration',
      name: 'administration',
      component: administration
    },
    {
      path: '/mitarbeiter',
      name: 'mitarbeiter',
      component: mitarbeiter
    },
    {
      path: '/projekte',
      name: 'projekte',
      component: projekte
    }
  ]
})
