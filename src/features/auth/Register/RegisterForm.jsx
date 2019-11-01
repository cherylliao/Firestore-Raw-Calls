import React, {useState} from 'react';
import FormInput from '../../../app/common/form/form-input.component';
import { auth, createUserProfileDocument } from '../firebase.utils';
import CustomButton from '../../../app/common/form/custom-button.component';
import {closeModal} from "../../modals/modalActions";
import {connect} from 'react-redux';

// import './sign-up.styles.scss';
const actions = {closeModal};
const RegisterForm=({closeModal}) => {
  
  const [values, setValues] = useState({
    displayName: '',
      email: '',
      password: '',
      confirmPassword: ''
});
const {displayName,email, password,confirmPassword} = values;

  const handleSubmit = async event => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords don't match");
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

     

      setValues({...values, displayName:'', email:'', password:'', confirmPassword:''});
      await createUserProfileDocument(user,  {displayName} );
      console.log(displayName)
    } catch (error) {
      console.error(error);
    }
    closeModal();
  };

  const handleChange = name => event => {
    setValues({...values,[name]:event.target.value});

}
    return (
      <div className='sign-up'>
        <h2 className='title'>I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={handleSubmit}>
          <FormInput
            type='text'
            name='displayName'
            value={displayName}
            onChange={handleChange('displayName')}
            label='Display Name'
            required
          />
          <FormInput
            type='email'
            name='email'
            value={email}
            onChange={handleChange('email')}
            label='Email'
            required
          />
          <FormInput
            type='password'
            name='password'
            value={password}
            onChange={handleChange('password')}
            label='Password'
            required
          />
          <FormInput
            type='password'
            name='confirmPassword'
            value={confirmPassword}
            onChange={handleChange('confirmPassword')}
            label='Confirm Password'
            required
          />
          <CustomButton type='submit'>SIGN UP</CustomButton>
        </form>
      </div>
    );
  
}
export default connect(null, actions)(RegisterForm);