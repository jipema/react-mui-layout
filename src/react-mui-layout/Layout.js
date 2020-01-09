import React, { useState, useContext, useCallback } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import EmptyIcon from '@material-ui/icons/Block';
import { SnackbarProvider } from 'notistack';

import Router, { HistoryProvider } from 'react-mega-router';
import NavMenu from './NavMenu';
import View from './View';
import Modal from './Modal';
import Notification from './Notification';
import LayoutRounder from './LayoutRounder';

import './Layout.scss';

export const AppContext = React.createContext([]);
function AppProvider(props) {
   const [project, setProject] = useState((props.config && props.config.project) || props.project || {});
   const [darkMode, setDarkMode] = useState((props.config && props.config.darkMode) || props.darkMode || (props.theme && props.theme.palette && props.theme.palette.type === 'dark'));
   const [theme, setTheme] = useState((props.config && props.config.theme) || props.theme || {});
   const toggleDarkMode = () => {
      setDarkMode(!darkMode);
   };
   const getThemeColors = () => {
      return {
         primary: theme && theme.palette && theme.palette.primary && theme.palette.primary.main,
         secondary: theme && theme.palette && theme.palette.secondary && theme.palette.secondary.main
      };
   };
   const setThemeColors = (primary, secondary) => {
      if (!primary && !secondary) return;

      const newTheme = { ...theme };
      if (!newTheme.palette) newTheme.palette = {};

      if (primary) {
         if (!newTheme.palette.primary) newTheme.palette.primary = {};
         newTheme.palette.primary.main = primary;
      }
      if (secondary) {
         if (!newTheme.palette.secondary) newTheme.palette.secondary = {};
         newTheme.palette.secondary.main = secondary;
      }

      setTheme(newTheme);
   };
   return <AppContext.Provider value={{ darkMode, setDarkMode, toggleDarkMode, theme, setTheme, getThemeColors, setThemeColors, project, setProject }}>{props.children}</AppContext.Provider>;
}

function LayoutContent(props) {
   const app = useContext(AppContext);
   //window.app = app;

   const [containerEl, setContainerEl] = useState();
   const onContainerRef = useCallback(
      (el) => {
         if (el && containerEl !== el) setContainerEl(el);
      },
      [containerEl]
   );

   //className
   let className = 'mui-layout';
   if (props.className) className += ' ' + props.className;

   //theme
   const themeProps = app.theme || {};
   if (!themeProps.palette) themeProps.palette = {};
   themeProps.palette.type = app.darkMode ? 'dark' : 'light';
   const theme = createMuiTheme(themeProps);
   className += app.darkMode ? ' dark-mode' : ' light-mode';

   //size
   const upSm = useMediaQuery(theme.breakpoints.up('sm'));
   const upMd = useMediaQuery(theme.breakpoints.up('md'));
   const upLg = useMediaQuery(theme.breakpoints.up('lg'));
   const upXl = useMediaQuery(theme.breakpoints.up('xl'));
   let size = 'xs';
   if (upXl) size = 'xl';
   else if (upLg) size = 'lg';
   else if (upMd) size = 'md';
   else if (upSm) size = 'sm';
   className += ' size-' + size;

   //sideMenu
   let sideMenu = props.sideMenu;
   if (sideMenu === undefined) sideMenu = upSm;
   if (typeof sideMenu === typeof App) sideMenu = sideMenu(size);
   if (sideMenu) className += ' menu-side';

   //largeMenu
   let largeMenu = sideMenu && props.largeMenu;
   if (largeMenu === undefined) largeMenu = upLg;
   if (typeof largeMenu === typeof App) largeMenu = largeMenu(size);
   if (largeMenu) className += ' menu-large';

   //menuLabels
   let menuLabels = props.menuLabels;
   if (menuLabels === undefined) menuLabels = upSm;
   if (typeof menuLabels === typeof App) menuLabels = menuLabels(size);

   //cols
   let cols = props.cols;
   if (cols === undefined) cols = upMd ? 2 : 1;
   if (typeof cols === typeof App) cols = cols(size);
   if (cols) className += ' cols-' + cols;

   //theme html & css globals
   if (props.updateDarkModeHtmlClass !== false) updateDarkModeHtmlClass(app.darkMode);
   if (props.updateDarkModeMetaTheme !== false) updateDarkModeMetaTheme(app.darkMode);
   if (props.updateCssVars !== false) updateCssVarsFromTheme(theme);

   return (
      <ThemeProvider theme={theme}>
         <SnackbarProvider className="mui-layout-notification" domRoot={containerEl} dense={!upSm} maxSnack={(props.config && props.config.maxNotifications) || props.maxNotifications || 5}>
            <HistoryProvider>
               <CssBaseline />
               <div ref={onContainerRef} className={className}>
                  <NavMenu routes={props.routes} theme={theme} />
                  <main className="routes">
                     <Router
                        routes={props.routes}
                        cols={cols}
                        routesExtraProps={{ app, size, theme: theme }}
                        notFound={
                           props.notFound || (
                              <View app={app} className="defaultNotFound" pageTitle={'404'} title={false} center>
                                 <EmptyIcon className="defaultNotFoundIcon" />
                              </View>
                           )
                        }
                     />
                     <LayoutRounder />
                  </main>
               </div>
               <Notification app={app} theme={theme} ref={(notification) => (app.notification = notification)} />
               <Modal app={app} theme={theme} ref={(modal) => (app.modal = modal)} />
            </HistoryProvider>
         </SnackbarProvider>
      </ThemeProvider>
   );
}

export function Layout(props) {
   return (
      <AppProvider config={props.config} darkMode={props.darkMode} theme={props.theme} project={props.project}>
         <LayoutContent {...props} />
      </AppProvider>
   );
}
export default Layout;

function updateDarkModeHtmlClass(dark) {
   if (dark) {
      document.documentElement.classList.add('dark-mode');
      document.documentElement.classList.remove('light-mode');
   } else {
      document.documentElement.classList.remove('dark-mode');
      document.documentElement.classList.add('light-mode');
   }
}
function updateDarkModeMetaTheme(dark, theme) {
   const meta = document.querySelector('meta[name="theme-color"]');
   if (!meta) return;
   if (dark) meta.setAttribute('content', (theme && theme.layout && theme.layout.htmlThemeMetaColorDark) || '#000');
   else meta.setAttribute('content', (theme && theme.layout && theme.layout.htmlThemeMetaColor) || '#fff');
}

function updateCssVarsFromTheme(theme) {
   if (!theme || !document || !document.documentElement) return;

   let cssVars = {};
   const loopObj = (obj, key, depth, maxDepth = 4) => {
      if (typeof obj !== typeof {}) return;
      if (depth && depth > maxDepth) return;

      for (let sub in obj) {
         const newKey = !key ? sub : key + '-' + sub;
         if (typeof obj[sub] === typeof 's' || typeof obj[sub] === typeof 42) {
            cssVars[newKey] = obj[sub];
         } else if (typeof obj[sub] === typeof {}) {
            loopObj(obj[sub], newKey, (depth || 0) + 1);
         }
      }
   };
   loopObj(theme);

   for (let key in cssVars) {
      document.documentElement.style.setProperty('--theme-' + key, cssVars[key]);
   }

   return cssVars;
}
