import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useSnackbar } from 'notistack';

import Button from './Button';
import IconButton from '@material-ui/core/IconButton';

import CloseIcon from '@material-ui/icons/Close';

import './Notification.scss';

export const Notification = React.forwardRef(function Modal(props, ref) {
   const theme = props.theme || {};

   const upSm = useMediaQuery(theme.breakpoints.up('sm'));
   const { enqueueSnackbar, closeSnackbar } = useSnackbar();
   const open = prms => {
      if (!prms || !enqueueSnackbar) return;
      const params = prms && prms.content ? { ...prms } : { content: prms };
      params.key = params.key || params.id || uuid();
      params.autoHideDuration = params.autoHideDuration || params.duration;
      if (params.autoHideDuration === undefined) params.autoHideDuration = 10000;
      if (params.autoHideDuration === 0) params.persist = true;

      let content = params.content;
      delete params.content;
      if (content && params.title) {
         content = (
            <div className="notification-content">
               <h3 className="notification-title">{params.title}</h3>
               <div className="notification-content">{content}</div>
            </div>
         );
         delete params.title;
      }

      //position
      params.anchorOrigin = params.anchorOrigin || params.position || props.anchorOrigin || props.position;
      delete params.position;
      if (params.anchorOrigin === undefined) {
         params.anchorOrigin = {
            vertical: 'top',
            horizontal: upSm ? 'right' : 'center'
         };
      }

      //prepare actions
      let actions = params.action || [];
      if (!params.action && !params.actions && params.action !== false && params.actions !== false) {
         params.actions = [{ icon: <CloseIcon />, value: 'close', className: 'auto-close' }];
      }
      if (params.actions && params.actions.length) {
         for (let action of params.actions) {
            if (!action || action.value === undefined || (!action.label && !action.icon && !action.startIcon && !action.endIcon)) continue;
            const onClick = async e => {
               const res = !action.onClick ? true : await action.onClick(e);
               if (res !== false) {
                  closeSnackbar(params.key, action.value);
                  if (params.onClose) params.onClose(e, action.value); //should be triggered by the component, but...
               }
            };
            const props = {
               key: action.key || action.value,
               className: 'auto-action ' + (action.className || ''),
               onClick: onClick,
               color: action.color || (action.primary && 'primary') || (action.secondary && 'secondary') || 'inherit',
               variant: action.variant || action.type || (action.primary && 'contained') || (action.secondary && 'contained')
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

            actions.push(<Button {...props} />);
         }
      }
      params.action = actions;
      delete params.actions;

      //type
      params.variant = params.variant || params.type;

      //promisify
      let promOk;
      const prom = new Promise(ok => {
         promOk = ok;
      });
      params.onClose = (e, reason) => {
         if (reason === 'clickaway') return;
         if (prms.onClose) prms.onClose(e, reason);
         return promOk(reason || true);
      };

      enqueueSnackbar(content, params);
      return prom;
   };

   //expose methods
   const exposable = { open, update: open, close: closeSnackbar };
   if (typeof ref === typeof Modal) ref(exposable);
   else if (ref && ref.current) ref.current = exposable;

   return null;
});
export default Notification;

function uuid(a) {
   return a ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
}
