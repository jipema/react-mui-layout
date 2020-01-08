import React from 'react';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalPizzaRoundedIcon from '@material-ui/icons/LocalPizzaRounded';

import FormPage from './pages/Form';
import Home from './pages/Home';
import { Page1, Page1a, Page1b } from './pages/Page1';

export const routes = [
   {
      path: '/',
      title: 'Home',
      component: Home,
      navMenuIcon: <HomeRoundedIcon />
   },
   {
      path: '/page1',
      title: 'Page 1',
      component: Page1,
      //navMenu: false,
      //navMenuIcon: <LocalPizzaRoundedIcon />,
      navMenuTitle: 'Page 1 loooong page title',
      routes: [
         {
            path: '/page1/a',
            title: 'Page 1a',
            component: Page1a,
            routes: [
               {
                  path: '/page1/a/b',
                  title: 'Page 1b',
                  component: Page1b,
                  cols: (props, cols, path, router, history) => {
                     if (props && (props.size === 'lg' || props.size === 'xl')) return 3;
                  }
               }
            ]
         }
      ]
   },
   {
      path: '/form',
      title: 'Form',
      //navMenu: false,
      navMenuIcon: <VerifiedUserRoundedIcon />,
      component: FormPage,
      badge: 3
   }
];
export default routes;
