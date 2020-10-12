import React from 'react';

import SideMenu from '../components/SideMenu'
import Header from '../components/Header';
import PageHeader from '../components/PageHeader'

import { makeStyles } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';



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
        <PageHeader
          title="Page Header"
          subtitle="Page description"
          icon={<PeopleIcon/>}
        />
      </div>
    </>
  );
}

export default App;
