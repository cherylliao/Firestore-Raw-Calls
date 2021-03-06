import React, {Fragment, useContext} from 'react'
import {connect} from 'react-redux'
import {Menu, Container, Button} from 'semantic-ui-react'
import {NavLink, Link,withRouter,Redirect} from 'react-router-dom'
import SignedOutMenu from '../Menus/SignedOutMenu'
import SignedInMenu from '../Menus/SignedInMenu'
import {openModal} from '../../modals/modalActions'
import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';



import { auth, createUserProfileDocument } from '../../auth/firebase.utils';


const actions = {
  openModal
}


//needs to re-renders the NavBar
const NavBar=({history, openModal})=> {
  
   
   
   const handleSignIn =()=>openModal('LoginModal');
   const handleSignOut =()=>{
    auth.signOut()
     history.push('/')
   }

   const handleRegister = () =>{
    openModal('RegisterModal')
   }
    const currentUser = useContext(CurrentUserContext)
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
                   <SignedInMenu signOut={handleSignOut} currentUser = {currentUser}/>
                 </Menu.Item>
                 ):(
                 <SignedOutMenu signIn={handleSignIn} register ={handleRegister}/>)}
                 
               </Container>
             </Menu>
    )
}





export default withRouter(connect(null,actions)(NavBar));