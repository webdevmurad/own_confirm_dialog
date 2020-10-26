import React from 'react';

import SideMenu from '../components/SideMenu'
import Header from '../components/Header'
import Employees from '../pages/Employees/Employees'

import { makeStyles } from '@material-ui/core';



const useStyles = makeStyles({
  appMain: {
    paddingLeft: '320px',
    width: '100%'
  }
})

function App() {
  const classes = useStyles();

  return (
    <>
      <SideMenu/>
      <div className={classes.appMain}>
        <Header/>
        <Employees/>
      </div>
      
    </>
  );
}

export default App;
