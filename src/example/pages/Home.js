
import React from 'react';

import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import HomeRoundedIcon from '@material-ui/icons/HomeRounded';
import LocalPizzaRoundedIcon from '@material-ui/icons/LocalPizzaRounded';

import Container from '@material-ui/core/Container';

import { View, Button } from '../../react-mui-layout';

import './Home.scss';

export default function Home(props) {
   if(!window.app) window.app = props.app;
   const toggleDarkMode = e => {
      if (props.app && props.app.toggleDarkMode) props.app.toggleDarkMode();
   };
   const toggleTheme = e => {
      const newColors = { ...props.app.getThemeColors() };
      if (newColors.primary === '#2EB67D') return props.app.setThemeColors('#e01563', '#6ecadc');
      if (newColors.primary === '#e01563') return props.app.setThemeColors('#2EB67D', '#ECB22E');
   };
   const openModalConfirm = async () => {
      if (!props.app || !props.app.modal || !props.app.modal.open) return;
      const confirmed = await props.app.modal.open({
         title: 'Are you sure?',
         content: 'Dont get wrong, this choice is so important!',
         confirm: true,
         closeable: false
      });
      console.log('>>> confirmed button', confirmed);
   };
   const openModalBatch = () => {
      if (!props.app || !props.app.modal || !props.app.modal.open) return;
      for (let i = 1; i <= 3; i++) {
         props.app.modal.open({
            title: 'Hello world BATCH ' + i,
            content: 'Wassup here? BATCH ' + i,
            id: new Date().getTime() + '-' + i
         });
      }
   };
   const openFullScreenModal = () => {
      if (!props.app || !props.app.modal || !props.app.modal.open) return;
      props.app.modal.open({
         title: 'Full screen!',
         content: 'How is it?',
         fullScreen: true
      });
   };
   const openNotification = async () => {
      if (!props.app || !props.app.notification || !props.app.notification.open) return;
      const closed = await props.app.notification.open('I love hooks');
      console.log('>>> NOTIF CLOSED', closed);
   };
   const openNotificationUnlimited = async () => {
      if (!props.app || !props.app.notification || !props.app.notification.open) return;
      const closed = await props.app.notification.open({
         title: 'No no nooooo',
         content: 'I dont have no limits.',
         duration: 0,
         type: 'info'
      });
      console.log('>>> NOTIF CLOSED', closed);
   };
   const openNotificationActions = async () => {
      if (!props.app || !props.app.notification || !props.app.notification.open) return;
      const closed = await props.app.notification.open({
         content: 'I have many actions. I have many actions. I have many actions. I have many actions.',
         title: 'With actions',
         duration: 0,
         actions: [
            { primary: true, label: 'Action 1', value: 1 },
            { secondary: true, icon: <VerifiedUserRoundedIcon />, label: 'Action 2', value: 2 },
            { icon: <LocalPizzaRoundedIcon />, value: 3 },
            { label: 'Action 4', value: 4 }
         ]
      });
      console.log('>>> NOTIF CLOSED', closed);
   };

   return (
      <View {...props} pageTitle={''} title={false} className="view-home" center>
         <Container maxWidth="sm">
            <HomeRoundedIcon className="bigicon" />
            <Button href="/page1" startIcon={<LocalPizzaRoundedIcon />} variant="contained" color="primary" size="large">
               Page 1
            </Button>
            <Button href="/page1" startIcon={<VerifiedUserRoundedIcon />} variant="contained" color="secondary" size="large">
               Form
            </Button>
            <Button className="theme theme-dark" variant="contained" onClick={toggleDarkMode}>
               Toggle Dark Mode
            </Button>
            <Button className="theme theme-colors" variant="contained" onClick={toggleTheme}>
               Toggle Theme
            </Button>
            <Button className="modal" variant="contained" onClick={openModalConfirm}>
               Open Confirm
            </Button>
            <Button className="modal batch" variant="contained" onClick={openModalBatch}>
               Open Modal BATCH
            </Button>
            <Button className="modal full" variant="contained" onClick={openFullScreenModal}>
               Open Modal FULL
            </Button>
            <Button className="notif basic" variant="contained" onClick={openNotification}>
               Open Notification
            </Button>
            <Button className="notif unlimited" variant="contained" onClick={openNotificationUnlimited}>
               Open Unlimited Notification
            </Button>
            <Button className="notif unlimited" variant="contained" onClick={openNotificationActions}>
               Open Actions Notification
            </Button>
         </Container>
      </View>
   );
}