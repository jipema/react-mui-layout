import React from 'react';
import { Link } from 'react-mega-router';

import Paper from '@material-ui/core/Paper';
import VerifiedUserRoundedIcon from '@material-ui/icons/VerifiedUserRounded';
import LocalPizzaRoundedIcon from '@material-ui/icons/LocalPizzaRounded';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Container from '@material-ui/core/Container';

import { View } from '../../react-mui-layout';

const actions = [
   { label: 'Foo', href: '/page1', id: 'foo' },
   { label: 'Bar', icon: <LocalPizzaRoundedIcon />, href: '/page1/a', id: 'bar' },
   { icon: <VerifiedUserRoundedIcon />, onClick: e => alert('Click !!'), id: 'bla' }
];

export function Page1(props) {
   console.log('>>> RENDER PAGE 1');
   return (
      <View {...props} actions={actions} menu={actions}>
         <Container maxWidth="sm">
            <Paper>
               <List>
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a">
                     <ListItem>
                        <ListItemText primary="Sub A" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b">
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/c">
                     <ListItem>
                        <ListItemText primary="Sub C" />
                     </ListItem>
                  </Link>
                  <Divider />
               </List>
            </Paper>
         </Container>
      </View>
   );
}
export function Page1a(props) {
   return (
      <View {...props} menu={actions}>
         <Container maxWidth="sm">
            <Paper>
               <List>
                  <Link href="/page1" strict>
                     <ListItem>
                        <ListItemText primary="Parent" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a/b" strict>
                     <ListItem>
                        <ListItemText primary="Sub B" />
                     </ListItem>
                  </Link>
               </List>
            </Paper>
         </Container>
      </View>
   );
}
export function Page1b(props) {
   return (
      <View {...props}>
         <Container maxWidth="sm">
            <Paper>
               <List>
                  <Link href="/page1" strict>
                     <ListItem>
                        <ListItemText primary="Grand-Parent" />
                     </ListItem>
                  </Link>
                  <Divider />
                  <Link href="/page1/a" strict>
                     <ListItem>
                        <ListItemText primary="Parent" />
                     </ListItem>
                  </Link>
               </List>
            </Paper>
         </Container>
      </View>
   );
}