import React,{useState} from 'react';
import { Button, Divider, Form, Header, Segment } from 'semantic-ui-react';

import RadioInput from '../../../app/common/form/RadioInput';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import PlaceInput from '../../../app/common/form/PlaceInput';
import SelectInput from '../../../app/common/form/SelectInput';

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
  const handleOptionChange =() =>{}
  return (
    <Segment>
      <Header dividing size="large" content="About Me" />
      <p>Complete your profile to get the most out of this site</p>
      <Form>
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
        <input name="about" component={TextArea} placeholder="About Me" />
        <Divider />
        <input
          name="interests"
          placeholder="Select your interests"
        />
         <Divider />
        <input
          width={8}
          name="occupation"
          type="text"
          component={TextInput}
          placeholder="Occupation"
        />
         <Divider />
        <input
          width={8}
          name="origin"
          options={{ types: ['(regions)'] }}
          component={PlaceInput}
          placeholder="Country of Origin"
        />
        <Divider />
        <Button disabled={pristine || submitting} size="large" positive content="Update Profile" />
      </Form>
    </Segment>
  );
};

export default AboutPage;