 import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import dashboardDayDetail from '@/components/dashboard/dashboard-day-detail'
import administration from '@/components/administration'
import mitarbeiter from '@/components/mitarbeiter'
import projekte from '@/components/projekte'
import arbeitsplaene from '@/components/administration/arbeitsplaene'
import feiertage from '@/components/administration/feiertage'
import laender from '@/components/administration/laender'
import standorte from '@/components/administration/standorte'
import abteilungen from '@/components/administration/abteilungen'
import adprojekte from '@/components/administration/adprojekte'
import benutzer from '@/components/administration/benutzer'
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
      path: '/administration/arbeitsplaene',
      name: 'arbeitsplaene',
      component: arbeitsplaene
    },
    {
      path: '/administration/feiertage',
      name: 'feiertage',
      component: feiertage
    },
    {
      path: '/administration/laender',
      name: 'laender',
      component: laender
    },
    {
      path: '/administration/standorte',
      name: 'standorte',
      component: standorte
    },
    {
      path: '/administration/abteilungen',
      name: 'abteilungen',
      component: abteilungen
    },
    {
      path: '/administration/adprojekte',
      name: 'adprojekte',
      component: adprojekte
    },
    {
      path: '/administration/benutzer',
      name: 'benutzer',
      component: benutzer
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
