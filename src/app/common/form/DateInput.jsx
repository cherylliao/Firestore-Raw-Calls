import React from "react";
import DatePicker from "react-datepicker";
import {Form,Label} from 'semantic-ui-react'
 
import "react-datepicker/dist/react-datepicker.css";



const DateInput = ({input,meta:{touched,error},...rest}) => {
 
   
  return (
      <Form.Field error={touched && !!error}>
    <DatePicker {...rest}{...input}
        selected={input.value ? new Date(input.value):null}
        onChange={input.onChange}
        onBlur={input.onBlur}
        

        
      />
      {touched && error && <Label basic color ='red'>{error}</Label>}
      </Form.Field>
  )
}

export default DateInput
