import React from 'react'

import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'

import { Paper, makeStyles } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    }
}))


export default function Employees() {

    const classes = useStyles();

    return (
        <>
            <PageHeader
                title="Page Header"
                subtitle="Form design with validation"
                icon={<PeopleIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                <EmployeeForm/>
            </Paper>
        </>
    )
}