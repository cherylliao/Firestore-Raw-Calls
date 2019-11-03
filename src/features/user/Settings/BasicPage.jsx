import React, {useState, useContext} from 'react';
import {Segment, Header, Divider, Form, Button, Input} from 'semantic-ui-react';
import { getFirebase } from 'react-redux-firebase';
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlaceInput";
import TextInput from "../../../app/common/form/TextInput";
import {toast} from 'react-toastify';
import FormInput from '../../../app/common/form/form-input.component';
import { subYears } from 'date-fns';
import {firestore, auth} from '../../auth/firebase.utils';

// import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';
// import CustomButton from '../../../app/common/form/custom-button.component';

//provide the authorized user on top of this rendered component in 
//settingsDashboard
const BasicsPage =({pristine, submitting, currentUser}) => {
  
  if(currentUser){
  var name = currentUser.displayName
}
 
  const [user, setUser] = useState({
    displayName: name,
    dateOfBirth: '',
      city: ''
       });
  const [sex, setSex]=useState('male')
  const handleOptionChange = e =>{
    setSex(e.target.value)
  }

       const {displayName, dateOfBirth,city} = user;
       const handleChange = name => event => {
        setUser({...user,[name]:event.target.value});
       }
      
    const handleSubmit = async event => {
      event.preventDefault();
      try {
       setUser({...user, sex,displayName: '', 
        dateOfBirth: '',
        city: ''});
const userRef = firestore.doc(`users/${auth.currentUser.uid}`);
const snapShot = await userRef.get();
if (snapShot.exists) {
    try {
      await userRef.update({
        sex, dateOfBirth,city
      });
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.error("Error updating profile")
    }
  }
}catch(error){
    console.log(error)
  }
}
    
 return (
            <Segment>
                <Header dividing size='large' content='Basics' />
                <Form onSubmit={handleSubmit}>
               
                   
                    <input
                        width={8}
                        name='displayName'
                        value={name}
                        onChange={handleChange('displayName')}
                        type='text'
                        component={TextInput}
                        
                       
                    />
                    <Divider/>
                   
                    <label>
            <input type="radio" value="male" 
            checked={sex === 'male'}
            onChange={handleOptionChange}
             />
            Male
          </label>
          <label>
            <input type="radio" checked={sex === 'female'}
            onChange={handleOptionChange}
            value="female" />
            Female
          </label>
          <Divider/>       
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
                        maxDate={subYears(new Date(), 18)}
                        
                        
                        
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