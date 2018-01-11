import Vue from 'vue'
import Router from 'vue-router'
//import BootstrapVue from 'bootstrap-vue'
import dashboard from '@/components/dashboard'
import dashboardDayDetail from '@/components/dashboard/dashboard-day-detail'
import administration from '@/components/administration'
import mitarbeiter from '@/components/mitarbeiter'
import projekte from '@/components/projekte'
import arbeitsplaene from '@/components/administration/arbeitsplan/arbeitsplaene'
import feiertage from '@/components/administration/feiertag/feiertage'
import laender from '@/components/administration/land/laender'
import standorte from '@/components/administration/standort/standorte'
import abteilungen from '@/components/administration/abteilung/abteilungen'
import adprojekte from '@/components/administration/projekte/projekte'
import benutzer from '@/components/administration/benutzer/benutzer'
import newProject from '@/components/projects/newProject'
import login from '@/components/login'
import neueAbteilung from '@/components/administration/abteilung/neueAbteilung'
import neuesLand from '@/components/administration/land/neuesLand'
import neuerArbeitsplan from '@/components/administration/arbeitsplan/neuerArbeitsplan'
import neuerFeiertag from '@/components/administration/feiertag/neuerFeiertag'
import neuerBenutzer from '@/components/administration/benutzer/neuerBenutzer'
import neuerStandort from '@/components/administration/standort/neuerStandort'



Vue.use(Router)
//Vue.use(BootstrapVue);

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
      path: '/administration/projekte',
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
    },
    {
      path: '/administration/neueAbteilung',
      name: 'neueAbteilung',
      component: neueAbteilung
    },
    {
      path: '/administration/neuesLand',
      name: 'neuesLand',
      component: neuesLand
    },
    {
      path: '/administration/neuerArbeitsplan',
      name: 'neuerArbeitsplan',
      component: neuerArbeitsplan
    },
    {
      path: '/administration/neuerBenutzer',
      name: 'neuesBenutzer',
      component: neuerBenutzer
    },
    {
      path: '/administration/neuerFeiertag',
      name: 'neuerFeiertag',
      component: neuerFeiertag
    },
    {
      path: '/administration/neuerStandort',
      name: 'neuerStandort',
      component: neuerStandort
    }
  ]
})
