import React, {useState, useContext} from 'react';
import {Segment, Header, Divider, Form, Button, Input} from 'semantic-ui-react';
import { getFirebase } from 'react-redux-firebase';
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import RadioInput from "../../../app/common/form/RadioInput";
import FormInput from '../../../app/common/form/form-input.component';
import { addYears } from 'date-fns';

import { auth, createUserProfileDocument, saveProfile} from '../../auth/firebase.utils';

// import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';
// import CustomButton from '../../../app/common/form/custom-button.component';

//provide the authorized user on top of this rendered component in 
//settingsDashboard
const BasicsPage =({pristine, submitting, currentUser}) => {
  if(currentUser){
  var name = currentUser.displayName
  
}



  const [user, setUser] = useState({
    displayName: '',
      gender: '',
      dateOfBirth: '',
      city: ''
       });

       const {displayName, gender, dateOfBirth,city} = user;
       const handleChange = name => event => {
        setUser({...user,[name]:event.target.value});
    
    }
    const handleSubmit = async event => {
      event.preventDefault();
      
   
      try {
        // await updateProfile(user);
        
        
        setUser({...user, displayName: '',
        gender: '',
        dateOfBirth: '',
        city: ''});
        //firebase database
        saveProfile(displayName,dateOfBirth,city)
       
        console.log(user)
      } catch (error) {
        console.error(error);
      }
      
    };

     return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit}>
                    <input
                        width={8}
                        name='displayName'
                        value={name}
                        // onChange={handleChange('displayName')}
                        type='text'
                        component={TextInput}
                        
                       
                    />
                    <Form.Group inline>
                      <label>Gender: </label>
                      <RadioInput name = 'gender' type = 'radio' value = 'male' label='Male'
                      
                      />
                      <RadioInput name = 'gender' type = 'radio' value = 'female' label='Female'
                      
                       />
                    </Form.Group>
                    <label>Date of Birth: </label>
                    <input type='date'
                        width={8}
                        component = {DateInput}
                        name='dateOfBirth'
                        value={dateOfBirth}
                        onChange={handleChange('dateOfBirth')}
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
                        value={city}
                        onChange={handleChange('city')}
                        component={PlaceInput}
                        width={8}
                    />
                    <Divider/>
                    <Button disabled={pristine || submitting} size='large' positive content='Update Profile'/>
                </Form>
            </Segment>
        );
    }


export default BasicsPage;