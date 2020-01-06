import React from 'react';
import ReactDOM from 'react-dom';

import Layout from './react-mui-layout';
import theme from './example/theme';
import routes from './example/routes';

ReactDOM.render(
   <Layout routes={routes} theme={theme} project={{name: 'React MUI Layout'}} />,
   document.getElementById('root')
);