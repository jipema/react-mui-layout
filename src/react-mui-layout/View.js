import React, { useCallback, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import IconButton from '@material-ui/core/IconButton';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Button from './Button';
import { Link } from 'react-mega-router';

import ArrowBackIcon from '@material-ui/icons/ArrowBack';
//import MenuIcon from '@material-ui/icons/Menu';
import MoreIcon from '@material-ui/icons/MoreVert';

import './View.scss';

export function View(props) {
   let className = 'mui-layout-view';
   
   if (props.className) className += ' ' + props.className;
   if (props.size === 'xs' || props.col) className += ' is-small';
   if (props.center) className += ' is-center';

   const [contentEl, setContentEl] = useState();
   const [menuIsOpen, setMenuIsOpen] = useState(false);
   const [menuAnchorEl, setMenuAnchorEl] = useState();
   const onContentRef = useCallback(
      el => {
         if (el && contentEl !== el) setContentEl(el);
      },
      [contentEl]
   );
   const onMenuAnchorRef = useCallback(
      el => {
         if (el && menuAnchorEl !== el) setMenuAnchorEl(el);
      },
      [menuAnchorEl]
   );

   const handleMenuClose = useCallback(
      e => {
         if (menuIsOpen) setMenuIsOpen(false);
      },
      [menuIsOpen]
   );
   const handleMenuOpen = useCallback(
      e => {
         if (!menuIsOpen) setMenuIsOpen(true);
      },
      [menuIsOpen]
   );

   let titleBar;
   if (props.title !== false && props.titleContent !== false) {
      //prepare actions
      let actionsProps = props.actions;
      if (typeof actionsProps === typeof View) actionsProps = actionsProps(props);
      const titleBarActions =
         actionsProps &&
         typeof actionsProps === typeof [] &&
         actionsProps.length &&
         (!props.col || props.actionsForce || typeof props.actions === typeof View) &&
         actionsProps
            .filter(action => {
               const key = action.key || action.value || action.id || action.label || action.to || action.href || action.path;
               if (!key) return false;
               action.key = key;
               return action && (action.label || action.icon) && (action.onClick || action.href || action.to || action.path);
            })
            .map(action => {
               const props = {
                  key: action.key,
                  className: action.className,
                  onClick: action.onClick,
                  color: action.color || 'inherit'
               };
               if (action.icon && !action.label) {
                  props.component = IconButton;
                  props.children = action.icon;
               } else {
                  props.startIcon = action.startIcon || action.icon;
                  props.endIcon = action.endIcon;
                  props.children = action.label;
               }
               if (action.to || action.href || action.path) props.to = action.to || action.href || action.path;

               return <Button {...props} />;
            });

      //prepare menu
      const menuId = slugify(props.path) + '-view-menu';
      let menuProps = props.menu;
      if (typeof menuProps === typeof View) menuProps = menuProps(props);
      const titleBarMenu =
         menuProps &&
         typeof menuProps === typeof [] &&
         menuProps.length &&
         (!props.col || props.actionsForce || typeof props.menu === typeof View) &&
         menuProps
            .filter(action => {
               const key = action.key || action.value || action.id || action.label || action.to || action.href || action.path;
               if (!key) return false;
               action.key = key;
               return action && action.label && (action.onClick || action.href || action.to || action.path);
            })
            .map(action => {
               const onClick = e => {
                  if (action.onClick) action.onClick(e, action);
                  if (action.to || action.href || action.path) props.history.push(action.to || action.href || action.path);
                  handleMenuClose();
               };
               return (
                  <MenuItem key={action.key} className={action.className} onClick={onClick}>
                     {action.icon}
                     {action.iconStart}
                     {action.label && <p>{action.label}</p>}
                     {action.iconEnd}
                  </MenuItem>
               );
            });

      const renderMenu = (
         <Menu className="auto-menu-content" anchorEl={menuAnchorEl} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} id={menuId} keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right' }} open={menuIsOpen} onClose={handleMenuClose}>
            {titleBarMenu}
         </Menu>
      );

      let titleBarContent = (
         <AppBar position="absolute">
            <Toolbar className="view-title">
               {!props.col && props.parent && (
                  <Link to={props.parent} className="auto-back">
                     <IconButton edge="start" color="inherit" aria-label="back">
                        {props.backIcon || <ArrowBackIcon />}
                     </IconButton>
                  </Link>
               )}
               <div className="title-content">
                  <Typography className="title-center" variant="h4">
                     {props.titleContent || props.pageTitle || props.title}
                  </Typography>
               </div>
               <div className="title-actions">
                  {(titleBarActions || props.customActions) && (
                     <div className="auto-actions">
                        {titleBarActions}
                        {props.customActions}
                     </div>
                  )}
                  {(titleBarMenu || props.customMenu) && (
                     <IconButton color="inherit" className="auto-menu" aria-label="show more" aria-controls={menuId} aria-haspopup="true" ref={onMenuAnchorRef} onClick={handleMenuOpen}>
                        {props.menuIcon || <MoreIcon />}
                     </IconButton>
                  )}
               </div>
            </Toolbar>
         </AppBar>
      );

      //hiding appbar, but not on XL layout
      if (props.size !== 'xl') {
         titleBarContent = (
            <HideOnScroll {...props} target={contentEl}>
               {titleBarContent}
            </HideOnScroll>
         );
      }
      titleBar = (
         <>
            {titleBarContent}
            {renderMenu}
         </>
      );
      className += ' has-title';
   }

   let helmet;
   if (!props.col) {
      let title = props.pageTitle || props.title;
      let projectName = props.app && props.app.project && props.app.project.name;
      if (projectName) {
         const sep = (props.app && props.app.config && props.app.config.titleSeparator) || ' | ';
         if (title) title = title + sep + projectName;
         else title = projectName;
      }
      helmet = (
         <Helmet>
            <title>{title}</title>
         </Helmet>
      );
   }

   return (
      <Box className={className}>
         {helmet}
         {titleBar}
         <div className="view-content" ref={onContentRef}>
            {contentEl && props.children}
         </div>
      </Box>
   );
}
export default View;

function HideOnScroll(props) {
   const { children, window } = props;
   const trigger = useScrollTrigger({ target: props.target || window });

   return (
      <Slide appear={false} direction="down" in={!trigger}>
         {children}
      </Slide>
   );
}

function slugify(str) {
   if (!str || typeof str !== typeof 's') return str;
   return str
      .toLowerCase()
      .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a') // Special Characters #1
      .replace(/[èÈéÉêÊëË]+/g, 'e') // Special Characters #2
      .replace(/[ìÌíÍîÎïÏ]+/g, 'i') // Special Characters #3
      .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o') // Special Characters #4
      .replace(/[ùÙúÚûÛüÜ]+/g, 'u') // Special Characters #5
      .replace(/[ýÝÿŸ]+/g, 'y') // Special Characters #6
      .replace(/[ñÑ]+/g, 'n') // Special Characters #7
      .replace(/[çÇ]+/g, 'c') // Special Characters #8
      .replace(/[ß]+/g, 'ss') // Special Characters #9
      .replace(/[Ææ]+/g, 'ae') // Special Characters #10
      .replace(/[Øøœ]+/g, 'oe') // Special Characters #11
      .replace(/[%]+/g, 'pct') // Special Characters #12
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w-]+/g, '') // Remove all non-word chars
      .replace(/--+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
}
