import Vue from 'vue'
import Router from 'vue-router'
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
import adprojektneu from '@/components/administration/projekte/new'
import adprojektedit from '@/components/administration/projekte/edit'
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

function beforeEnterFunction(to, from, next) {
  next();
}


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '*',
      component: {
        template: '<p>Page Not Found</p>'
      },
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/dashboard/day/:day',
      name: 'dashboard-day-detail',
      component: dashboardDayDetail,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration',
      name: 'administration',
      component: administration,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/mitarbeiter',
      name: 'mitarbeiter',
      component: mitarbeiter,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/projekte',
      name: 'projekte',
      component: projekte,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/arbeitsplaene',
      name: 'arbeitsplaene',
      component: arbeitsplaene,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/feiertage',
      name: 'feiertage',
      component: feiertage,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/laender',
      name: 'laender',
      component: laender,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/standorte',
      name: 'standorte',
      component: standorte,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/abteilungen',
      name: 'abteilungen',
      component: abteilungen,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/projekte',
      name: 'adprojekte',
      component: adprojekte,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/projekte/new',
      name: 'adprojektneu',
      component: adprojektneu,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/projekte/edit/:id',
      name: 'adprojektedit',
      component: adprojektedit
    },
    {
      path: '/administration/benutzer',
      name: 'benutzer',
      component: benutzer,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/newProject',
      name: 'newProject',
      component: newProject,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/administration/neueAbteilung',
      name: 'neueAbteilung',
      component: neueAbteilung,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/neuesLand',
      name: 'neuesLand',
      component: neuesLand,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/neuerArbeitsplan',
      name: 'neuerArbeitsplan',
      component: neuerArbeitsplan,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/neuerBenutzer',
      name: 'neuesBenutzer',
      component: neuerBenutzer,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/neuerFeiertag',
      name: 'neuerFeiertag',
      component: neuerFeiertag,
      beforeEnter: beforeEnterFunction,
    },
    {
      path: '/administration/neuerStandort',
      name: 'neuerStandort',
      component: neuerStandort,
      beforeEnter: beforeEnterFunction,
    }
  ]
})
