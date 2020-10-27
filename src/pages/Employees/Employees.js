import React from 'react'

import EmployeeForm from './EmployeeForm'
import PageHeader from '../../components/PageHeader'
import useTable from '../../components/useTable'
import {Controls} from '../../components/controls/Controls'
import Popup from '../../components/Popup'
import Notification from '../../components/Notification'

import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';
import * as employeeService from '../../services/employeeService'
import {Search} from '@material-ui/icons'
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import ConfirmDialog from '../../components/ConfirmDialog'


const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    }
}))

const headCells = [
    {id: 'fullName', label: 'Employee Name'},
    {id: 'email', label: 'Email Address (Personal)'},
    {id: 'mobile', label: 'Mobile Number'},
    {id: 'department', label: 'Department', disabledSorting: true},
    {id: 'actions', label: 'Actions', disabledSorting: true}
]


export default function Employees() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = React.useState(null)
    const [records, setRecords] = React.useState(employeeService.getAllEmployees())
    const [filterFn, setFilterFn] = React.useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = React.useState(false)
    const [notify, setNotify] = React.useState({ isOpen: false, message: '', type: '' })
    const [confirmDialog, setConfirmDialog] = React.useState({ isOpen: false, title: '', subTitle: '' })

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value === "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    const addOrEdit = (employee, resetForm) => {
        if (employee.id === 0)
            employeeService.insertEmployee(employee)
        else
            employeeService.updateEmployee(employee)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Submitted Successfully',
            type: 'success'
        })
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    const onDelete = id => {
        setConfirmDialog({
            ...confirmDialog,
            isOpen: false
        })
        employeeService.deleteEmployee(id);
        setRecords(employeeService.getAllEmployees())
        setNotify({
            isOpen: true,
            message: 'Deleted Successfully',
            type: 'error'
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
                    <Controls.Button
                        className={classes.newButton}
                        text = "Add New"
                        variant = "outlined"
                        startIcon = {<AddIcon/>}
                        onClick={() => {setOpenPopup(true);setRecordForEdit(null);}}
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
                                    <TableCell>
                                        <Controls.ActionButton color="primary" onClick={() => {openInPopup(item)}}>
                                            <EditOutlinedIcon fontSize="small"/>
                                        </Controls.ActionButton>
                                        <Controls.ActionButton color="secondary" onClick={() => {
                                                setConfirmDialog({
                                                    isOpen: true,
                                                    title: 'Are you sure to delete this record?',
                                                    subTitle: "You can`t undo this operation",
                                                    onConfirm: () => {onDelete(item.id)}
                                                })
                                            }}>
                                            <CloseIcon/>
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
            </Paper>
            <Popup
                title="Employee Form"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
                <EmployeeForm recordForEdit={recordForEdit} addOrEdit={addOrEdit}/>
            </Popup>
            <Notification
                notify={notify}
                setNotify={setNotify}
            />
            <ConfirmDialog
                confirmDialog={confirmDialog}
                setConfirmDialog={setConfirmDialog}
            />
        </>
    )
}
