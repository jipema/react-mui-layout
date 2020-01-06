import React, { useState, useRef, useEffect, useCallback } from 'react';
import Button from './Button';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';
import Slide from '@material-ui/core/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
   return <Slide {...props} direction="up" ref={ref} />;
});

export const Modal = React.forwardRef(function Modal(props, ref) {
   const queue = useRef([]);
   const openDebounce = useRef();
   const [modal, setModal] = useState(null);
   const [open, setOpen] = useState(false);

   const handleClose = useCallback(
      (e, reason) => {
         if (!open) return;
         if (modal && modal.onClose) modal.onClose(e, reason, modal);
         if (modal && modal.promOk) modal.promOk(reason || true);
         //setModal(null);
         setOpen(false);
      },
      [modal, open]
   );
   const openNext = useCallback(
      (debounce = 150) => {
         if (openDebounce.current) openDebounce.current = clearTimeout(openDebounce.current);
         openDebounce.current = setTimeout(() => {
            if (!queue || !queue.current || !queue.current.length || open) return;
            const newModal = queue.current.shift();
            setModal(newModal);
            setOpen(true);
         }, debounce);
      },
      [open]
   );
   const add = useCallback(
      prms => {
         if (!prms || (!prms.content && !prms.title)) return;
         const newQueue = (queue && queue.current) || [];

         //prepare params
         const params = { ...prms };
         params.id = params.id || new Date().getTime();
         params.prom = new Promise(ok => (params.promOk = ok));

         //prepare actions
         params.actions = params.actions || [];
         if (params.confirm || params.type === 'confirm') {
            params.actions.push({
               label: 'Cancel',
               value: false,
               light: true
            });
            params.actions.push({
               label: 'OK',
               value: true,
               primary: true
            });
         }
         if (!params.actions.length && prms.actions !== false) {
            params.actions.push({
               label: 'OK',
               value: true,
               primary: true
            });
         }

         //update existing
         for (let i in newQueue) {
            if (newQueue[i].id === params.id) {
               newQueue[i] = params;
               openNext();
               return newQueue[i] && newQueue[i].prom;
            }
         }

         //enqueue
         newQueue.push(params);
         queue.current = newQueue;
         openNext();
         return params.prom;
      },
      [openNext]
   );
   const close = useCallback(
      (id, e) => {
         if (!queue || !queue.current || !queue.current.length) return;

         //in queue
         if (id) {
            let found;
            for (let i in queue.current) {
               if (queue.current[i] && queue.current[i].id === id) {
                  found = i;
                  break;
               }
            }
            if (found !== undefined) {
               found = queue.current.splice(found, 1);
            }
            return found;
         }

         //current
         if (modal) {
            handleClose(e);
         }
      },
      [modal, handleClose]
   );

   //expose methods
   const exposable = { open: add, update: add, close };
   if (typeof ref === typeof Modal) ref(exposable);
   else if (ref && ref.current) ref.current = exposable;

   //on modal update, check queue
   useEffect(() => {
      openNext();
   }, [open, modal, openNext]);

   let dialogProps = {
      open: open,
      onClose: handleClose
   };
   if (modal) {
      dialogProps = {
         ...dialogProps,
         id: modal.id,
         key: modal.key || modal.id,
         className: 'mui-layout-modal ' + (modal.className || ''),
         'aria-labelledby': modal.ariaLabel || 'alert-dialog-title',
         'aria-describedby': modal.ariaDescription || 'alert-dialog-description',
         fullWidth: modal.fullWidth === undefined && !modal.fullScreen ? true : modal.fullWidth,
         fullScreen: modal.fullScreen ? true : false,
         maxWidth: modal.size === undefined && !modal.fullScreen ? 'sm' : modal.size,
         disableEscapeKeyDown: modal.closeable === false ? true : undefined,
         disableBackdropClick: modal.closeable === false ? true : undefined,
         transitionDuration: modal.transitionDuration,
         TransitionProps: modal.transitionProps,
         TransitionComponent: modal && modal.transition !== undefined ? modal.transition : Transition
      };
   }

   return (
      <Dialog {...dialogProps}>
         {!modal ? false : (
            <>
               {modal.title && <DialogTitle id="alert-dialog-title">{modal.title}</DialogTitle>}
               {modal.content && (
                  <DialogContent>
                     {typeof modal.content === typeof 's' && <DialogContentText id="alert-dialog-description">{modal.content}</DialogContentText>}
                     {typeof modal.content !== typeof 's' && modal.content}
                  </DialogContent>
               )}
               {modal.actions && modal.actions.length > 0 && (
                  <DialogActions className={'count-' + modal.actions.length}>
                     {modal.actions.map(action => {
                        const onClickParam = action.onClick;
                        const onClick = e => {
                           if (onClickParam) onClickParam(e, action, modal);
                           handleClose(e, action.value || action.id || action.key || action.reason || 'action');
                        };

                        return (
                           <Button
                              key={action.id || action.value || action.key || action.label}
                              className={'modal-action ' + (action.className || '')}
                              onClick={onClick}
                              fullWidth={action.fullWidth}
                              size={action.size}
                              startIcon={action.icon || action.startIcon}
                              endIcon={action.endIcon}
                              color={action.color || (action.primary && 'primary') || (action.secondary && 'secondary')}
                              autoFocus={action.focus || action.autoFocus || (action.primary && !modal.fullWidth) || false}
                              variant={action.variant || (action.outline && 'outlined') || (action.light && 'text') || 'contained'}
                           >
                              {action.label}
                           </Button>
                        );
                     })}
                  </DialogActions>
               )}
            </>
         )}
      </Dialog>
   );
});
export default Modal;
