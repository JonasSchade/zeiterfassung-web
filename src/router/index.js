 import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import dashboardDayDetail from '@/components/dashboard/dashboard-day-detail'
import administration from '@/components/administration'
import mitarbeiter from '@/components/mitarbeiter'
import projekte from '@/components/projekte'
import newProject from '@/components/projects/newProject'
import login from '@/components/login'

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
      path: '/dashboard/day/:day',
      name: 'dashboard-day-detail',
      component: dashboardDayDetail
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
    },
    {
      path: '/newProject',
      name: 'newProject',
      component: newProject
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
