import React from 'react';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { View } from '../../react-mui-layout';

export default function FormPage(props) {
   return (
      <View {...props}>
         <Container maxWidth="sm">
            <Paper>
               <Grid container spacing={1}>
                  <Grid item xs={12}>
                     <TextField helperText="basic" fullWidth name="text" label="Text" />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField error helperText="this is an error" fullWidth name="error" label="Error" />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField helperText="email input" fullWidth name="email" label="Email" type="email" />
                  </Grid>
                  <Grid item xs={12}>
                     <TextField helperText="auto-sizeable" fullWidth multiline name="textarea" label="Textarea" />
                  </Grid>

                  <Grid container direction="row" justify="flex-end">
                     <Button variant="contained" color="primary">
                        Submit
                     </Button>
                  </Grid>
               </Grid>
            </Paper>
         </Container>
      </View>
   );
}
