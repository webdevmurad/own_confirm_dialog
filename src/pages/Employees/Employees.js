import React from 'react'

import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import useTable from '../../components/useTable'
import {Controls} from '../../components/controls/Controls'

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import * as employeeService from '../../services/employeeService'
import {Search} from '@material-ui/icons'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%'
    }
}))

const headCells = [
    {id: 'fullName', label: 'Employee Name'},
    {id: 'email', label: 'Email Address (Personal)'},
    {id: 'mobile', label: 'Mobile Number'},
    {id: 'department', label: 'Department', disabledSorting: true},
]


export default function Employees() {

    const classes = useStyles();
    const [records, setRecords] = React.useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = React.useState({fn: items => {return items;}})

    const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target
        setFilterFn({
            fn: items => {
                if(target.value === '') {
                    return items;
                } else {
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
                }  
            }
        })
    }

    return (
        <>
            <PageHeader
                title="Page Header"
                subtitle="Form design with validation"
                icon={<PeopleIcon fontSize="large"/>}
            />
            <Paper className={classes.pageContent}>
                {/* <EmployeeForm/> */}
                <Toolbar>
                    <Controls.Input
                        label="Search Employees"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search/>
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                </Toolbar>
                <TblContainer>  
                    <TblHead/>
                    <TableBody>
                        {
                            recordsAfterPagingAndSorting().map(item => 
                            (
                                <TableRow key={item.id}>
                                    <TableCell>{item.fullName}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.mobile}</TableCell>
                                    <TableCell>{item.department}</TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
        </>
    )
}
