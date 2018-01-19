import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import dashboardDayDetail from '@/components/dashboard/dashboard-day-detail'
import administration from '@/components/administration'
import mitarbeiter from '@/components/mitarbeiter'
import projekte from '@/components/projekte'

import adprojekte from '@/components/administration/projekte/projekte'
import adprojektneu from '@/components/administration/projekte/new'
import adprojektedit from '@/components/administration/projekte/edit'

import admitarbeiter from '@/components/administration/mitarbeiter/mitarbeiter'
import admitarbeiterneu from '@/components/administration/mitarbeiter/new'
import admitarbeiteredit from '@/components/administration/mitarbeiter/edit'

import abteilungen from '@/components/administration/abteilung/abteilungen'
import adabteilungedit from '@/components/administration/abteilung/edit'
import adabteilungnew from '@/components/administration/abteilung/new'

import newProject from '@/components/projects/newProject'
import login from '@/components/login'
import settings from '@/components/settings'



Vue.use(Router);

function authPromise() {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest();

    xhr.open("GET", 'http://localhost:3000/api/authenticate',true);
    xhr.setRequestHeader("Authorization", 'bearer '+ window.sessionStorage.chronosAuthToken);

    xhr.onreadystatechange  = () => {
      if(xhr.readyState == XMLHttpRequest.DONE) {
        if(JSON.parse(xhr.response).loggedin) {
          resolve();
        } else {
          reject();
        }
      }
    }

    xhr.onerror = () => {
      reject();
    }

    xhr.send();
  });
}

async function auth() {
  return await authPromise();
}


function checkIfLoggedIn(to, from, next) {
  //TODO: administration pages check for admin
  auth().then(result => {
    next();
  }, () => {
    next('/');
  });

}


export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '*',
      component: {
        template: '<p>Page Not Found</p>'
      },
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: dashboard,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/dashboard/day/:day',
      name: 'dashboard-day-detail',
      component: dashboardDayDetail,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration',
      name: 'administration',
      component: administration,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/mitarbeiter',
      name: 'mitarbeiter',
      component: mitarbeiter,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/projekte',
      name: 'projekte',
      component: projekte,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/abteilungen',
      name: 'abteilungen',
      component: abteilungen,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/projekte',
      name: 'adprojekte',
      component: adprojekte,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/projekte/new',
      name: 'adprojektneu',
      component: adprojektneu,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/projekte/edit/:id',
      name: 'adprojektedit',
      component: adprojektedit,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/mitarbeiter/edit/:id',
      name: 'admitarbeiteredit',
      component: admitarbeiteredit,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/mitarbeiter',
      name: 'admitarbeiter',
      component: admitarbeiter,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/newProject',
      name: 'newProject',
      component: newProject,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/administration/abteilungen/new',
      name: 'adabteilungnew',
      component: adabteilungnew,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/abteilungen/edit/:id',
      name: 'adabteilungedit',
      component: adabteilungedit,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/mitarbeiter/new',
      name: 'neuerMitarbeiter',
      component: admitarbeiterneu,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/settings',
      name: 'settings',
      component: settings,
      beforeEnter: checkIfLoggedIn,
    }
  ]
})
