import React, {Component} from 'react';
import {Segment, Header, Divider, Form, Button, Input} from 'semantic-ui-react';

import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import FormInput from '../../../app/common/form/form-input.component';
import { addYears } from 'date-fns';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// import CustomButton from '../../../app/common/form/custom-button.component';
class BasicsPage extends Component {

    render() {
        const {pristine, submitting} = this.props;
        return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form>
                    <Input
                        width={8}
                        name='displayName'
                        type='text'
                        component={TextInput}
                        placeholder='Known As'
                    />
                    <Form.Group inline>
                      <label>Gender: </label>
                      <RadioInput name = 'gender' type = 'radio' value = 'male' label='Male'
                      />
                      <RadioInput name = 'gender' type = 'radio' value = 'female' label='Female'
                       />
                    </Form.Group>
                    <label>Date of Birth: </label>
                    <DatePicker
                        width={8}
                        name='dateOfBirth'
                        
                        placeholder='Date of Birth'
                        dateFormat ='dd LLL yyyy'
                        showYearDropdown={true}
                        showMonthDropdown={true}
                        dropdownMode='select'
                        maxDate={addYears(new Date(), -18)}
                        
                    />
                    <Divider/>
                    <Input
                        name='city'
                        placeholder='Home Town'
                        options={{types: ['(cities)']}}
                        
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }
}

export default BasicsPage;