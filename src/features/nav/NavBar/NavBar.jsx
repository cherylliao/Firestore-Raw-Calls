import React, {useState,Fragment} from 'react'
import {connect} from 'react-redux'
import {Menu, Container, Button} from 'semantic-ui-react'
import {NavLink, Link,withRouter} from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'
import {openModal} from '../../modals/modalActions'

import { auth } from '../../auth/firebase.utils'


const actions = {
  openModal
}



const NavBar=({currentUser,history, openModal})=> {
  
   
   
   const handleSignIn =()=>openModal('LoginModal');
   const handleSignOut =()=>{
    auth.signOut()
     history.push('/')
   }

   const handleRegister = () =>{
    openModal('RegisterModal')
   }
   
    return (
             <Menu inverted fixed="top">
               <Container>
                 <Menu.Item as ={NavLink} exact to='/' header>
                   <img src="assets/logo.png" alt="logo" />
                   Re-vents
                 </Menu.Item>
                 <Menu.Item as ={NavLink} exact to='/events' name="Events" />
                 
                 <Fragment>
                 <Menu.Item as ={NavLink} to='/people' name="People" />
                 <Menu.Item as ={NavLink} to='/test' name="Test" />
                 
                 </Fragment>
                 {currentUser? (
                   <Menu.Item>
                   <Button as={Link} to='/createEvent' floated="right" positive inverted content="Create Event" />
                   <SignedInMenu signOut={handleSignOut} currentUser = {auth.currentUser}/>
                 </Menu.Item>
                 ):(
                 <SignedOutMenu signIn={handleSignIn} register ={handleRegister}/>)}
                 
               </Container>
             </Menu>
    )
}
const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});
export default withRouter(connect(mapStateToProps,actions)(NavBar));