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
      path: '/administration/arbeitsplaene',
      name: 'arbeitsplaene',
      component: arbeitsplaene,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/feiertage',
      name: 'feiertage',
      component: feiertage,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/laender',
      name: 'laender',
      component: laender,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/standorte',
      name: 'standorte',
      component: standorte,
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
      component: adprojektedit
    },
    {
      path: '/administration/benutzer',
      name: 'benutzer',
      component: benutzer,
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
      path: '/administration/neueAbteilung',
      name: 'neueAbteilung',
      component: neueAbteilung,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/neuesLand',
      name: 'neuesLand',
      component: neuesLand,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/neuerArbeitsplan',
      name: 'neuerArbeitsplan',
      component: neuerArbeitsplan,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/neuerBenutzer',
      name: 'neuesBenutzer',
      component: neuerBenutzer,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/neuerFeiertag',
      name: 'neuerFeiertag',
      component: neuerFeiertag,
      beforeEnter: checkIfLoggedIn,
    },
    {
      path: '/administration/neuerStandort',
      name: 'neuerStandort',
      component: neuerStandort,
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
