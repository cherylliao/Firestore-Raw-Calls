import React,{useContext} from 'react'
import { Menu,Image, Dropdown} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import { auth } from '../../auth/firebase.utils'
import { connect } from 'react-redux';
import CurrentUserContext from '../../../app/contexts/current-user/current-user.context';
// import {signOut} from '../../auth/authActions'
//import signOut again.
const SignedInMenu = () => {
  const currentUser = useContext(CurrentUserContext)

  return (
        <Menu.Item position="right">
          <Image avatar spaced="right" src='/assets/user.png' />
          <Dropdown pointing="top left" text= {currentUser.email}>
            <Dropdown.Menu>
              <Dropdown.Item text="Create Event" icon="plus" />
              <Dropdown.Item text="My Events" icon="calendar" />
              <Dropdown.Item text="My Network" icon="users" />
              <Dropdown.Item text="My Profile" icon="user" />
              <Dropdown.Item as={Link} to='/settings' text="Settings" icon="settings" />
              <Dropdown.Item onClick={()=>auth.signOut()} text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
  )
}

const mapStateToProps = ({ user: { currentUser } }) => ({
  currentUser
});

export default connect(mapStateToProps)(SignedInMenu);
