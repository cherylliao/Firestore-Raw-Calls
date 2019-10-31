import React, {useState} from 'react';

import FormInput from '../../../app/common/form/form-input.component';
import CustomButton from '../../../app/common/form/custom-button.component';
import {NavLink, Link,withRouter,Redirect} from 'react-router-dom'
import { auth, signInWithGoogle } from '../firebase.utils';
import {closeModal} from "../../modals/modalActions";
import {connect} from 'react-redux';
const actions = {closeModal};

const LoginForm =({closeModal})=> {
  const [values, setValues] = useState({
    email:"",
    password:""
});
const {email, password} = values;

  const handleSubmit = async event => {
    event.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      setValues({...values});
      console.log(values)
      
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };


  const handleChange = name => event => {
    setValues({...values,[name]:event.target.value});

}
    //  const handleSignIn =(event) =>{
    //    event.preventDefault();
    //    closeModal();
    //  }

 
    return (
      <div className='sign-in'>
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={handleSubmit}>
          <FormInput
            name='email'
            type='email'
            handleChange={handleChange('email')}
            value={email}
            label='email'
            required
          />
          <FormInput
            name='password'
            type='password'
            value={password}
            handleChange={handleChange('password')}
            label='password'
            required
          />
          <div className='buttons'>
            <CustomButton type='submit'> Sign in </CustomButton>
            <CustomButton onClick={signInWithGoogle} isGoogleSignIn>
              Sign in with Google
            </CustomButton>
          </div>
        </form>
      </div>
    );
  
}


export default connect(null, actions)(LoginForm);