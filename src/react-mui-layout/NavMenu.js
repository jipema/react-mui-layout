import React from 'react';
import ButtonBase from '@material-ui/core/ButtonBase';
import Badge from '@material-ui/core/Badge';
import { Link } from 'react-mega-router';

import './NavMenu.scss';

export function Menu(props) {
   let cl = 'mui-layout-navmenu';
   const menuLinks = [];
   if (props.routes) {
      for (let route of props.routes) {
         if (!route.path || route.navMenu === false) continue;
         const title = route.navMenuLabel || route.navMenuTitle || route.title || String(menuLinks.length + 1);
         console.log('>>> ROUTE', title, route);
         let icon = route.navMenuIcon;
         if (icon === undefined) icon = <h2 className="MuiSvgIcon-root no-icon">{route.navMenuIcon || initials(title)}</h2>; 
         menuLinks.push(
            <Link href={route.path} key={route.path}>
               <ButtonBase className={'link-content'}>
                  <Badge badgeContent={route.badge} color="secondary">
                     {icon}
                     <div className="link-label">{title}</div>
                  </Badge>
               </ButtonBase>
            </Link>
         );
      }
   }
   if (menuLinks.length < 2) return null;

   return (
      <nav className={cl}>
         {props.header && <div className="header">{props.header}</div>}
         <div className="links">{menuLinks}</div>
         {props.footer && <div className="footer">{props.footer}</div>}
      </nav>
   );
}
export default Menu;

function initials(txt, max = 3) {
   if (!txt) return null;
   let split = String(txt)
      .replace(/([A-Z]+)/g, ' $1')
      .replace(/([A-Z][a-z])/g, ' $1')
      .split('-')
      .join(' ')
      .split('.')
      .join(' ')
      .split('/')
      .join(' ')
      .split('_')
      .join(' ')
      .split(' ');
   if (!split || !split.length) return null;
   let out = '';
   for (let i in split) {
      if (split[i] && out.length < max) {
         const trim = String(split[i]).trim();
         if (trim[0] && String(trim[0])) out += String(trim[0]).toUpperCase();
      }
   }

   return out;
}
