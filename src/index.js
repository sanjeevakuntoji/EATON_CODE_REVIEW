import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {  MuiThemeProvider,  createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import * as PXBThemes from '@pxblue/themes/react';
require ("typeface-open-sans");
ReactDOM.render(<MuiThemeProvider theme={createMuiTheme(PXBThemes.blue)}>
<CssBaseline/>
<App/>
</MuiThemeProvider>, document.getElementById('root'));

