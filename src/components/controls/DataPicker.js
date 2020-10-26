import React from 'react'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'

export default function DataPicker(props) {

    const { name, label, value, onChange } = props

    const convertToDeEventPara = (name, value) => ({
        target: {
            name, value
        }
    })


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker disableToolbar variant="inline" inputVariant="outlined"
                label={label}
                format="MMM/dd/yyyy"
                name={name}
                value={value}
                onChange={date => onChange(convertToDeEventPara(name, date))}
            >

            </KeyboardDatePicker>
        </MuiPickersUtilsProvider>
    )
}
