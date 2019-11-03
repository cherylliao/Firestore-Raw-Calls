import React,{useState} from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import {firestore, auth, createUserProfileDocument, db} from '../../auth/firebase.utils';
import {toast} from 'react-toastify';

const interests = [
  { key: 'drinks', text: 'Drinks', value: 'drinks' },
  { key: 'culture', text: 'Culture', value: 'culture' },
  { key: 'film', text: 'Film', value: 'film' },
  { key: 'food', text: 'Food', value: 'food' },
  { key: 'music', text: 'Music', value: 'music' },
  { key: 'travel', text: 'Travel', value: 'travel' }
];

const AboutPage = ({ pristine, submitting,currentUser }) => {
  const [status, setStatus] =useState('single')
  const [user, setUser] = useState({
    about: '',
    interests: '',
    occupation: '',
    origin:''
       });
  const handleOptionChange =e =>{
    setStatus(e.target.value)
  }

  const {about, interests, occupation, origin} = user;
  const handleChange = name => event => {
    setUser({...user,[name]:event.target.value});
   }

   const handleSubmit = async event => {
    event.preventDefault();
    try {
     setUser({...user, status, about: '', 
      interests: '', occupation:'',
      origin: ''});
const userRef = firestore.doc(`users/${auth.currentUser.uid}`);
const snapShot = await userRef.get();
if (snapShot.exists) {
  try {
    await userRef.update({
      status, about, interests, origin
    });
    toast.success("About info added successfully!")
  } catch (error) {
    console.log('error creating user', error.message);
  }
}
}catch(error){
  console.log(error)
}
}

  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form onSubmit={handleSubmit}>
      <label>
            <input type="radio" value="single" 
            checked={status === 'single'}
            onChange={handleOptionChange}
             />
            Single
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" checked={status === 'relationship'} 
            onChange={handleOptionChange}
            value="relationship" />
            Relationship
          </label>
          &nbsp;&nbsp;&nbsp;
          <label>
            <input type="radio" checked={status === 'married'} 
            onChange={handleOptionChange}
            value="married" />
            Married
          </label>
        <Divider />
        <label>Tell us about yourself</label>
        <input name="about" 
        onChange={handleChange('about')}
        component={TextArea} placeholder="About Me" />
        <Divider />
        <input
          name="interests"
          placeholder="Select your interests"
          onChange={handleChange('interests')}
        />
         <Divider />
        <input
          width={8}
          name="occupation"
          type="text"
          onChange={handleChange('occupation')}
          component={TextInput}
          placeholder="Occupation"
        />
         <Divider />
        <input
          width={8}
          name="origin"
          onChange={handleChange('origin')}
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button 
        disabled={pristine || submitting} size="large" positive content="Update Profile" />
      </Form>
    </Segment>
  );
};

export default AboutPage;